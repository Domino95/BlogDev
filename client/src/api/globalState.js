import React, { createContext, useState } from 'react'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    console.log(document.cookie)



    const state = {
        isLogged: [isLogged, setIsLogged]
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}