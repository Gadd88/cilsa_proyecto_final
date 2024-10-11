import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

type TUser = {
    nombre: string
    email: string
    _id?: string
}

type RegisterUser = TUser & {
    password: string,
    repassword: string
}
type Tlogin = {
    email: string,
    password: string
}

type AuthContextType = {
    userData: TUser
    setUserData: Dispatch<SetStateAction<TUser>>
    userRegister: RegisterUser
    setUserRegister: Dispatch<SetStateAction<RegisterUser>>
    loginData: Tlogin
    setLoginData: Dispatch<SetStateAction<Tlogin>>
    token: string
    setToken: Dispatch<SetStateAction<string>>
    handleLogout: () => void
    handleLogin: (ev: React.FormEvent) => void
    handleRegister: (ev:React.FormEvent) => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({children}:{children: ReactNode}) => {

    const tokenStorage = localStorage.getItem('token') || ''
    const userStorage = JSON.parse(localStorage.getItem('user')!) || null
    const [isLogged, setIsLogged] = useState(false)
    const [userData, setUserData] = useState<TUser>(userStorage)
    const [userRegister, setUserRegister] = useState<RegisterUser>({} as RegisterUser)
    const [token, setToken] = useState(tokenStorage)
    const [loginData, setLoginData] = useState<Tlogin>({} as Tlogin)

    const handleLogout = () => {
        localStorage.clear()
        setIsLogged(false)
        location.reload()
    }
    const handleLogin = async (ev: React.FormEvent) => {
        ev.preventDefault()
        try{
            const result = await fetch('http://localhost:3002/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            })
            if(!result.ok) throw new Error('Error al iniciar sesión')
            const data = await result.json()
            setUserData(data.user)
            setToken(data.token)
            setIsLogged(true)
        }catch(error){
            console.log(error)
        }
    }

    const handleRegister = async(ev: React.FormEvent) =>{
        ev.preventDefault()
        if(userRegister.password !== userRegister.repassword){
            return alert('Las constraseñas no coinciden')
        }
        console.log(userRegister)
        const response = await fetch('http://localhost:3002/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRegister)
        })
        const data = await response.json()
    if(data.status !== 201) return alert(data.message)
        setUserData(data.user)
        setToken(data.token)
        setIsLogged(true)
    }

    useEffect(()=> {
        if(isLogged){
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userData))
        }
    },[isLogged])

    return(
        <AuthContext.Provider value={{
            userData,
            setUserData,
            token,
            setToken,
            userRegister,
            setUserRegister,
            loginData,
            setLoginData,
            handleLogout,
            handleLogin,
            handleRegister
        }}>
            {children}
        </AuthContext.Provider>
    )
}