import TaskModel from "../models/task-model";
import UserModel from "../models/user-model";

export type TaskType = {
    nombre:string,
    descripcion:string,
    estado: string,
    fecha_creacion: Date,
    usuario_id: string
}

export const findAllTasks = async () => {
    const tasks = await TaskModel.find();
    return {
        status: 200,
        tasks
    }
}

export const findOneTask = async (id: string) => {
    const task = await TaskModel.findById(id);
    if(!task) return {
        status: 404
    };
    return {
        status: 200,
        task
    }
}

export const editOneTask = async (taskData: TaskType, taskId: string) => {
    const { nombre, descripcion, estado, fecha_creacion, usuario_id } = taskData;
    const task = await TaskModel.findByIdAndUpdate(taskId, { nombre, descripcion, estado, fecha_creacion, usuario_id });
    return {
        status: 200,
        task
    }
}

export const addOneTask = async (taskData: TaskType) => {
    const { nombre, descripcion, estado, fecha_creacion, usuario_id } = taskData;
    const newTask = new TaskModel({ nombre, descripcion, estado, fecha_creacion,usuario_id });
    await newTask.save();
    const user = await UserModel.findById(usuario_id)
    user!.tasks.push(newTask._id)
    await user?.save()
    return {
        status: 201,
        newTask
    }
}

export const deleteOneTask = async (taskId: string) => {
    const task = await TaskModel.findById(taskId);
    if(!task) return {
        status: 404
    }
    await UserModel.findByIdAndUpdate(
       {_id: task!.usuario_id},
        { $pull: { tasks: task._id } }
    )
    await TaskModel.findByIdAndDelete(taskId);
    return {
        status: 200
    }
}