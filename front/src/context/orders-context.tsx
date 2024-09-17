import { createContext, ReactNode } from "react";


export const OrderContext = createContext(null!)

export const OrderProvider = ({children}:{children: ReactNode}) => {




    return(
        <OrderContext.Provider value={null!}>
            {children}
        </OrderContext.Provider>
    )
}