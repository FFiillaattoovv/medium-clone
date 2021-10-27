import React, {createContext, Dispatch, useReducer} from "react";

const initialState: StateType = {
    isLoading: false,
    isLoggedIn: undefined,
    currentUser: undefined,
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
        case 'LOGOUT':
            return {
                ...initialState,
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
    image: string | undefined
}
export type StateType = {
    isLoading: boolean
    isLoggedIn: boolean | undefined
    currentUser: CurrentUserType | undefined
}

type LoadingActionType = {type: 'LOADING'}
type SetAuthorizedActionType = {type: 'SET_AUTHORIZED', payload: CurrentUserType}
type SetUnauthorizedActionType = {type: 'SET_UNAUTHORIZED'}
type LogoutActionType = {type: 'LOGOUT'}
type ActionsType = LoadingActionType | SetAuthorizedActionType | SetUnauthorizedActionType | LogoutActionType

export type ContextType = [StateType, Dispatch<ActionsType>]