import React, {createContext, useState} from "react";


export const CurrentUserContext = createContext([{}, () => {}])

export const CurrentUserProvider: React.FC = ({children}) => {
    const [state, setState] = useState<StateType>({
        isLoading: false,
        isLoggedIn: null,
        currentUser: null,
    })
    return (
        <CurrentUserContext.Provider value={[state, setState]}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export type StateType = {
    isLoading: boolean
    isLoggedIn: boolean | null
    currentUser: {
        email: string
        token: string
        username: string
        bio: string
        image: string | null
    } | null
} | {}

export type ContextType = [StateType, (state: StateType) => StateType]