import { LoginForm, RegisterForm } from '../../components'

export const AuthView = () => {
  return (
    <div className='flex flex-col max-w-6xl md:flex-row mx-auto gap-10 p-5 md:p-10 space-y-10 md:space-y-0 mt-10'>
        <article className='w-full md:w-1/2'>
            <h2 className='text-3xl font-black text-center'>Inicia Sesión</h2>
            <LoginForm />
        </article>
        <article className='w-full md:w-1/2'>
            <h2 className='text-3xl font-black text-center'>Regístrate</h2>
            <RegisterForm />
        </article>
    </div>
  )
}
