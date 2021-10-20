import React, {createContext, Dispatch, SetStateAction, useState} from "react";


export const CurrentUserContext = createContext<ContextType>([{}, () => {}])


export const CurrentUserProvider: React.FC = ({children}) => {
    const [state, setState] = useState<StateType>({
        isLoading: false,
        isLoggedIn: null,
        currentUser: null,
    })
    return (
        <CurrentUserContext.Provider value={[state, setState] as ContextType}>
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

export type ContextType = [StateType, Dispatch<SetStateAction<StateType>>]