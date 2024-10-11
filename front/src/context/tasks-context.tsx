import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";

export type TaskType = {
    nombre: string
    descripcion: string
    estado?: string
    fecha_creacion?: Date
    usuario_id: string
    _id?: string
}

type TaskContextType = {
    taskList: TaskType[]
    setTaskList: Dispatch<React.SetStateAction<TaskType[]>>
    createTask: (taskData: TaskType) => Promise<void>
    deleteTask: (taskId: TaskType['_id']) => Promise<void>
    changeTaskState: (taskId: TaskType['_id']) => Promise<void>
}

export const TaskContext = createContext({} as TaskContextType)

export const TaskProvider = ({children}:{children: ReactNode}) => {

    const { userData } = useAuth()

    const [taskList, setTaskList] = useState<TaskType[]>([])

    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:3002/api/tasks')
            if(!response.ok) throw new Error('Error al traer las tareas')
            const result: TaskType[] = await response.json()
            if(Array.isArray(result)){
                const userTasks = result.filter(task => task?.usuario_id === userData?._id)
                setTaskList(userTasks)
            }else{
                console.error('No es array', result)
            }
        }catch(error){
            console.error('Ocurrió un error al traer las tareas ', error)
        }
    }
    const createTask = async (taskData: TaskType) => {
        try{
            const response = await fetch('http://localhost:3002/api/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            })
            if(!response.ok) throw new Error('Error al crear la tarea')
            const result = await response.json()
            const { newTask } = result
            setTaskList([...taskList, newTask])
        }catch(error){
            console.error('Ocurirá un error al crear la tarea', error)
        }
    }

    const deleteTask = async (taskId: TaskType['_id']) => {
        try{
            const response = await fetch('http://localhost:3002/api/tasks/' + taskId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": 'Bearer'
                }
            })
            if(!response.ok) throw new Error('Error al borrar la tarea')
            await response.json()
            setTaskList(taskList.filter(task => task._id !== taskId))
        }catch(error){
            console.error('Error al borrar la tarea', error)
        }
    }

    const changeTaskState = async (taskId: TaskType['_id']) => {
        const task = taskList.find(task => task._id === taskId)
        if(!task) return
        task.estado = task.estado === 'En progreso' ? 'Completada' : 'En progreso'
        const response = await fetch('http://localhost:3002/api/tasks/' + taskId, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
        if(!response.ok) throw new Error('Ocurrió un error al editar la tarea')
        const result = await response.json()
        await fetchTasks()
    }

    useEffect(()=>{
        fetchTasks()
    },[])

    return(
        <TaskContext.Provider value={{
            taskList,
            setTaskList,
            createTask,
            deleteTask,
            changeTaskState
        }}>
            {children}
        </TaskContext.Provider>
    )
}