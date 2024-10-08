import { createContext, ReactNode, useState } from "react";

type OrderContextType = {
    orders: []
}

export const OrderContext = createContext({} as OrderContextType)

export const OrderProvider = ({children}:{children: ReactNode}) => {

    const [orders, setOrders] = useState([])


    return(
        <OrderContext.Provider value={{
            orders
        }}>
            {children}
        </OrderContext.Provider>
    )
}