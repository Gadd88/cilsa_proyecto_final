import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const LoginForm = () => {
  const { setLoginData, loginData, handleLogin } = useAuth();
  const navigate = useNavigate()
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [ev.target.name]: ev.target.value,
    });
  };

  const handleSubmit = async(ev: React.FormEvent) => {
    ev.preventDefault();
    handleLogin(ev);
    setTimeout(()=>{
        navigate('/tareas')
    },1500)
  };
  return (
    <form
      className="flex flex-col gap-4 mx-auto w-full"
      onSubmit={handleSubmit}
    >
      <div className="w-full space-y-3">
        <label className="flex items-center gap-2">Tu email</label>
        <input
          type="email"
          className="input w-full input-bordered  grow"
          placeholder="tuemail@gmail.com"
          name="email"
          onChange={handleChange}
        />
      </div>
      <div className="w-full space-y-3">
        <label className="flex items-center gap-2">Password</label>
        <input
          type="password"
          className="input w-full input-bordered  grow"
          placeholder="********"
          name="password"
          onChange={handleChange}
        />
      </div>
      <div className="w-full flex justify-center items-center">
        <input
          type="submit"
          value="Ingresar"
          className="btn btn-primary w-full md:w-72 text-xl text-white"
        />
      </div>
      <p>
        No tienes cuenta? <span className="font-black">Registrate</span>
      </p>
    </form>
  );
};
