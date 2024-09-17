import { createContext, ReactNode } from "react";


export const BookContext = createContext(null!)

export const BookProvider = ({children}:{children: ReactNode}) => {




    return(
        <BookContext.Provider value={null!}>
            {children}
        </BookContext.Provider>
    )
}