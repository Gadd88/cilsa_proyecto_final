import { ResumeCard } from "../../components"
import { FaBookOpen, FaTasks  } from "react-icons/fa";
import { SiGoogletasks } from "react-icons/si";


export const HomeView = () => {

  const iconClasses = 'w-20 h-20 p-1 rounded-full shadow-sm shadow-white mx-auto'
  return (
    <main className="p-5 max-w-6xl mx-auto">
      <h1 className="text-7xl text-slate-200 text-center mb-10">
        Bienvenido
      </h1>
      <section className="flex flex-col gap-6 mx-auto md:flex-row items-center md:justify-center">
        <ResumeCard title="Libros" description="Administra tus libros" link="Libros" icon={<FaBookOpen className={iconClasses}/>} type='books' />
        <ResumeCard title="Tareas" description="Administra tus tareas" link="Tareas" icon={<FaTasks className={iconClasses}/>} type='tasks' />
        <ResumeCard title="Pedidos" description="Administra tus pedidos" link="Pedidos" icon={<SiGoogletasks className={iconClasses}/>} type='orders' />
      </section>
    </main>
  )
}
