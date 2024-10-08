import React from "react";
import { TaskType } from "../context";
import { useTasks } from "../hooks/useTasks";

export const TaskItem = ({task}: {task: TaskType}) => {

  const { deleteTask, changeTaskState } = useTasks()
  const { nombre, descripcion, estado, fecha_creacion, _id} = task


  const checkState = () => {
    if (estado === 'Pendiente') {
      return 'badge-neutral'
    }
    if (estado === 'En progreso') {
      return 'badge-secondary'
    }
    if (estado === 'Completada') {
      return 'badge-accent'
    }
  }
  return (
    <div className="card bg-base-100 max-w-80 min-w-72 shadow-xl border min-h-72">
      <div className="card-body">
        <div className="flex justify-between">
          <p className="text-sm font-semibold text-white">{new Date(fecha_creacion).toLocaleDateString()}</p>
          <div className={`badge ${checkState()} ms-auto`}>{estado}</div>
        </div>
        <h2 className="card-title">{nombre}</h2>
        <p className="">{descripcion}</p>
        <div className="card-actions justify-between flex items-center">
          <button className="btn w-full md:w-28 text-white font-black btn-neutral" onClick={() => deleteTask(_id)}>Eliminar</button>
          <button className={`btn w-full md:w-28 text-white font-black ${estado === 'Pendiente' ? 'btn-secondary' : 'btn-primary'}`} disabled={estado === 'Completada'} onClick={()=>changeTaskState(_id)}>{estado === 'Pendiente' ? 'En Progreso' : 'Completado'}</button>
        </div>
      </div>
    </div>
  );
};
