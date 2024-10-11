import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { IoMenuSharp, IoClose  } from "react-icons/io5";
import { useAuth } from "../hooks/useAuth";


export const Navbar = () => {
  const location = useLocation();
  const viewName = location.pathname.slice(1, location.pathname.length);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const {handleLogout, userData } = useAuth()

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <header>
      <div className="drawer z-20">
        <input
          id="my-drawer"
          type="checkbox"
          className="drawer-toggle"
          checked={isDrawerOpen}
          readOnly
        />
        <div className="drawer-content">
          <nav className="navbar bg-base-100">
            <div className="navbar-start flex gap-4">
              <label
                htmlFor="my-drawer"
                className="drawer-button"
                onClick={() => setDrawerOpen(!isDrawerOpen)}
              >
                <IoMenuSharp size={32}/>
              </label>
              <a className="text-2xl capitalize">{viewName}</a>
            </div>
            <div className="navbar-center"></div>
            {
              userData && (<div className="navbar-end">
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 p-2 shadow"
                >
                  <li>
                    <Link to={''} className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            </div>)
            }
          </nav>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            className="drawer-overlay"
            onClick={closeDrawer}
          ></label>
          <div className="w-56 min-h-full bg-base-200 text-base-content flex flex-col pt-6 gap-5">
            <div className="flex w-full items-center justify-between px-2">
              <p className="text-xl font-semibold ml-1">Menu</p>
              <button className="" onClick={closeDrawer}>
                <IoClose size={24}/>
              </button>
            </div>
            <ul className="menu px-2 py-0">
              <div className="divider m-0 mb-2"></div>
              <li>
                <Link to="/" onClick={closeDrawer}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/libros" onClick={closeDrawer}>
                  Libros
                </Link>
              </li>
              <li>
                <Link to="/tareas" onClick={closeDrawer}>
                  Tareas
                </Link>
              </li>
              <li>
                <Link to="/pedidos" onClick={closeDrawer}>
                  Pedidos
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
