import React from 'react'
import { useAuth } from '../hooks/useAuth';

export const RegisterForm = () => {

    const {userRegister, setUserRegister, handleRegister} = useAuth();

    const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        setUserRegister({
          ...userRegister,
          [ev.target.name]: ev.target.value,
        });
      };

  return (
    <form className="flex flex-col gap-4 mx-auto w-full" onSubmit={handleRegister}>
        <div className="w-full space-y-3">
            <label className="flex items-center gap-2">
                Tu nombre
            </label>
                <input type="text" className="input w-full input-bordered  grow" placeholder="Ingresa tu nombre completo" name="nombre" onChange={handleChange}/>
        </div>
        <div className="w-full space-y-3">
            <label className="flex items-center gap-2">
                Tu email
            </label>
                <input type="email" className="input w-full input-bordered  grow" placeholder="tuemail@gmail.com" name="email" onChange={handleChange}/>
        </div>
        <div className="w-full space-y-3">
            <label className="flex items-center gap-2">
                Password
            </label>
            <input type="password" className="input w-full input-bordered  grow" placeholder="********" name="password" onChange={handleChange}/>
        </div>
        <div className="w-full space-y-3">
            <label className="flex items-center gap-2">
                Reingresa el password
            </label>
            <input type="password" className="input w-full input-bordered  grow" placeholder="*******" name="repassword" onChange={handleChange}/>
        </div>
        <div className="w-full flex justify-between gap-1">
            <input type="submit" value='Agregar' className="btn btn-primary md:w-1/2 text-xl text-white" />
            <input type="reset" value="Limpiar" className="btn btn-secondary md:w-1/2 text-xl text-white" />
        </div>
    </form>
  )
}
