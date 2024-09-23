import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const location = useLocation();
  const viewName = location.pathname.slice(1, location.pathname.length);
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  const closeDrawer = () => setDrawerOpen(false);
  
  return (
    <header>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" checked={isDrawerOpen} readOnly/>
        <div className="drawer-content">
          <nav className="navbar bg-base-100">
            <div className="navbar-start flex gap-4">
              <label htmlFor="my-drawer" className="drawer-button" onClick={() => setDrawerOpen(!isDrawerOpen)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
              </label>
              <a className="text-xl capitalize">{viewName === "" ? "inicio" : viewName}</a>
            </div>
            <div className="navbar-center">
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          </nav>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay" onClick={closeDrawer}></label>
          <div className="w-56 min-h-full bg-base-200 text-base-content flex flex-col pt-6 gap-5">
            <div className="flex w-full items-center justify-between px-2">
              <p className="text-xl font-semibold ml-1">Menu</p>
              <button className="" onClick={closeDrawer}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </div>
            <ul className="menu">
              <li><Link to="/" onClick={closeDrawer}>Inicio</Link></li>
              <li><Link to="/libros" onClick={closeDrawer}>Libros</Link></li>
              <li><Link to="/tareas" onClick={closeDrawer}>Tareas</Link></li>
              <li><Link to="/pedidos" onClick={closeDrawer}>Pedidos</Link></li>
              <li><Link to="/perfil" onClick={closeDrawer}>Perfil</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
