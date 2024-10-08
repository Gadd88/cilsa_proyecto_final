import React from "react";
import { useTasks } from "../hooks/useTasks";

export const TaskForm = () => {

    const {createTask} = useTasks()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const taskData = {
            nombre: formData.get('nombre') as string,
            descripcion: formData.get('descripcion') as string,
            usuario_id: '66fb65555797924dfb5ab333'
        }
        createTask(taskData)
    }
  return (
    <form className="max-w-xl flex flex-col gap-4 mx-auto" onSubmit={handleSubmit}>
        <div className="w-full space-y-3">
            <label className="flex items-center gap-2">
                Nombre de la tarea
            </label>
                <input type="text" className="input w-full input-bordered  grow" placeholder="Ordenar..." name="nombre" />
        </div>
        <div className="w-full space-y-3">
            <label className="flex items-center gap-2">
                Descripción de la tarea
            </label>
                <textarea className="textarea w-full textarea-bordered resize-none" placeholder="Agrega una descripción" name="descripcion"/>
        </div>
        <div className="w-full">
            <input type="submit" value='Agregar' className="btn btn-primary w-full md:w-36 text-xl text-white" />
        </div>
    </form>
  );
};
