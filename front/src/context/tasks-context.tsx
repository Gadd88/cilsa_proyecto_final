import { createContext, ReactNode } from "react";


export const TaskContext = createContext(null!)

export const TaskProvider = ({children}:{children: ReactNode}) => {


    return(
        <TaskContext.Provider value={null!}>
            {children}
        </TaskContext.Provider>
    )
}