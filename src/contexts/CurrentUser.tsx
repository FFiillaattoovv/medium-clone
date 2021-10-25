import React, {createContext, Dispatch, useReducer} from "react";

const initialState: StateType = {
    isLoading: false,
    isLoggedIn: null,
    currentUser: null,
}

const reducer = (state: StateType, action: ActionsType) => {
    switch (action.type) {
        case 'LOADING':
            return {...state, isLoading: true}
        case 'SET_AUTHORIZED':
            return {
                ...state,
                isLoading: false,
                isLoggedIn: true,
                currentUser: action.payload
            }
        case 'SET_UNAUTHORIZED':
            return {
                ...state,
                isLoggedIn: false
            }
        default:
            return state
    }
}


export const CurrentUserContext = createContext({})


export const CurrentUserProvider: React.FC = ({children}) => {
    const value = useReducer(reducer, initialState)
    return (
        <CurrentUserContext.Provider value={value}>
            {children}
        </CurrentUserContext.Provider>
    )
}

// types
type CurrentUserType = {
    email: string
    token: string
    username: string
    bio: string
    image: string | null
}
export type StateType = {
    isLoading: boolean
    isLoggedIn: boolean | null
    currentUser: CurrentUserType | null
}

type LoadingActionType = {type: 'LOADING'}
type SetAuthorizedActionType = {type: 'SET_AUTHORIZED', payload: CurrentUserType}
type SetUnauthorizedActionType = {type: 'SET_UNAUTHORIZED'}
type ActionsType = LoadingActionType | SetAuthorizedActionType | SetUnauthorizedActionType

export type ContextType = [StateType, Dispatch<ActionsType>]