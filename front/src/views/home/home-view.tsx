import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export const HomeView = () => {
  return (
    <main className="h-full flex flex-col gap-5 lg:flex-row lg:gap-8 p-6">
      {/* card section */}
      <section className="flex flex-wrap gap-4 justify-start sm:flex-row lg:flex-col lg:min-w-60 xl:w-60 2xl:w-64">
        {/* card tareas */}
        <div className="card card-bordered w-full sm:w-64 lg:w-full card-side card-compact bg-neutral shadow-xl">
          <div className="card-body">
            <div className="w-full flex justify-between items-center">
              <h2 className="card-title">Tareas</h2>
              <Link to={"/tareas"}>
                <span title="Ir a tareas">
                  <IoOpenOutline className="cursor-pointer" size={18} />
                </span>
              </Link>
            </div>
            <p>Tareas pendientes: 10</p>
            <p>Tareas completadas: 5</p>
          </div>
        </div>
        {/* card ordenes */}
        <div className="card card-bordered w-full sm:w-64 lg:w-full card-side card-compact bg-neutral shadow-xl">
          <div className="card-body">
            <div className="w-full flex justify-between items-center">
              <h2 className="card-title">Ordenes</h2>
              <Link to={"/ordenes"}>
                <span title="Ir a ordenes">
                  <IoOpenOutline className="cursor-pointer" size={18} />
                </span>
              </Link>
            </div>
            <p>Ordenes pendientes: 10</p>
            <p>Ordenes completadas: 5</p>
          </div>
        </div>
        {/* card libros */}
        <div className="card card-bordered w-full sm:w-64 lg:w-full card-side card-compact bg-neutral shadow-xl">
          <div className="card-body">
            <div className="w-full flex justify-between items-center">
              <h2 className="card-title">Libros</h2>
              <Link to={"/libros"}>
                <span title="Ir a libros">
                  <IoOpenOutline className="cursor-pointer" size={18} />
                </span>
              </Link>
            </div>
            <p>Cantidad de libros: 10</p>
          </div>
        </div>
      </section>

      {/* profile and chart section */}
      <section className="w-full lg:w-2/3 border border-neutral rounded-xl flex items-center justify-center min-h-full lg:h-auto">
        {/* Placeholder for chart */}
        <p className="text-center">Aca estaria bueno poner un grafico</p>
      </section>
      
      <section className="w-full lg:w-1/3 border border-neutral rounded-xl flex items-center justify-center min-h-full lg:h-auto">
        {/* Placeholder for profile */}
        <p className="text-center">Aca estaria bueno una seccion de perfil</p>
      </section>
    </main>
  );
};
