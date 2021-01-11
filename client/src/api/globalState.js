import React, { createContext, useState } from 'react'
import postsAPI from './PostsAPI'
export const GlobalState = createContext()

export const DataProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(() => {
        if (document.cookie.length > 0) return true
        return false
    })

    const state = {
        isLogged: [isLogged, setIsLogged],
        postsAPI: postsAPI()
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}