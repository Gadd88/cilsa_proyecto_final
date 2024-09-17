import { useContext } from "react"
import { TaskContext } from "../context"

export const useTasks = () => {

    const context = useContext(TaskContext)

    if(!context){
        throw new Error('useTasks debe usarse dentro de AuthProvider')
    }

    return context
}