import React from "react";
import { Link } from "react-router-dom";
import { useBooks } from "../hooks/useBooks";
import { useTasks } from "../hooks/useTasks";
import { useOrders } from "../hooks/useOrders";

type ResumeCardProps = {
  title: string;
  description: string;
  link: string;
  icon: JSX.Element;
  type: string;
};

export const ResumeCard = ({
  title,
  description,
  link,
  icon,
  type,
}: ResumeCardProps) => {
  const { books } = useBooks();
  const { taskList } = useTasks();
  const { orders } = useOrders();

  const typeMsg = () => {
    if (type === "books") {
      return `Hay ${books.length} ${
        books.length === 1 ? "libro" : "libros"
      } en el inventario`;
    }
    if (type === "tasks") {
      return `Tienes ${taskList.length} ${
        taskList.length === 1 ? "tarea" : "tareas"
      } en el listado`;
    }
    if (type === "orders") {
      return `Tienes ${orders.length} ${
        orders.length === 1 ? "pedido" : "pedidos"
      } pendientes`;
    }
  };

  return (
    <div className="card bg-base-100 w-80 shadow-sm shadow-white py-2">
      {icon}
      <div className="card-body">
        <h2 className="card-title text-white">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-between flex items-center">
          <p className="text-xs w-1/2">{typeMsg()}</p>
          <Link
            to={`${link.toLowerCase()}`}
            className="btn btn-primary font-bold text-xl text-white"
          >
            {link}
          </Link>
        </div>
      </div>
    </div>
  );
};
