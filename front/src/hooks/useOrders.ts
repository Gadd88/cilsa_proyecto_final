import { useContext } from "react"
import { OrderContext } from "../context"

export const useOrders = () => {

    const context = useContext(OrderContext)

    if(!context){
        throw new Error('useOrders debe usarse dentro de AuthProvider')
    }

    return context
}