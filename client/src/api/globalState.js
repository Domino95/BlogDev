import React, { createContext, useState } from 'react'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(() => {
        if (document.cookie.length > 0) return true
        return false
    })
    console.log(isLogged)



    const state = {
        isLogged: [isLogged, setIsLogged]
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}