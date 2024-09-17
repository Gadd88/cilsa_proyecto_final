import { useContext } from "react"
import { BookContext } from "../context"

export const useBooks = () => {

    const context = useContext(BookContext)

    if(!context){
        throw new Error('useBooks debe usarse dentro de AuthProvider')
    }

    return context
}