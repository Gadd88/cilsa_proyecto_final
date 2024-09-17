import { createContext, ReactNode } from "react";

type TUser = {
    name: string
    email: string
    phone: string
    id: string
}

type AuthContextType = {
    user: TUser
    login: () => void
    logout: () => void
}

export const AuthContext = createContext<AuthContextType>(null!)

export const AuthProvider = ({children}:{children: ReactNode}) => {

    return(
        <AuthContext.Provider value={null!}>
            {children}
        </AuthContext.Provider>
    )
}