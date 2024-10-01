import { Response, Request } from "express";
import { addOneTask, deleteOneTask, editOneTask, findAllTasks, findOneTask } from "../services/task-services";

const getTasks = async (req: Request, res: Response) => {
    const result = await findAllTasks();
    if(result.status !== 200) return res.status(404).json({message: 'Ocurrió un error'});
    return res.json(result.tasks);
}

const getTaskById = async (req: Request, res:Response) => {
    const result = await findOneTask(req.params.id);
    if(result.status !== 200) return res.status(404).json({message: 'No se encuentra la tarea'});
    res.status(200).json(result.task)
}

const addTask = async (req: Request, res: Response) => {
    const taskData = req.body;
    const result = await addOneTask(taskData);
    if(result.status !== 201) return res.status(500).json({message: "Ocurrió un error al agregar la tarea"})
    const newTask = result.newTask
    return res.json({message: 'Tarea agregado', newTask});
}

const editTask = async (req: Request, res: Response) => {
    const taskId = req.params.id;
    const taskData = req.body;
    const result = await editOneTask(taskData, taskId); 
    if(result.status !== 200) return res.status(404).json({message: 'Ocurrió un error'});
    const editedTask = result.task
    return res.json({message: 'Tarea actualizada', editedTask });
}

const deleteTask = async (req: Request, res:Response) => {
    const taskId = req.params.id;
    const result = await deleteOneTask(taskId);
    if(result.status !== 200) return res.status(404).json({message: 'No se encontró la tarea a eliminar'});
    return res.json({message: 'Tarea eliminado'});
}

export { getTasks, getTaskById, addTask, editTask, deleteTask }