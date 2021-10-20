import {useFetch} from "../hooks/useFetch";
import {ContextType, CurrentUserContext, StateType} from "../contexts/CurrentUser";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useContext, useEffect} from "react";

export const CurrentUserChecker = ({children}: any) => {
    const [{response}, doFetch] = useFetch('/user')
    const [, setCurrentUserState] = useContext(CurrentUserContext) as ContextType
    const [token] = useLocalStorage('token')

    useEffect(() => {
        if (!token) {
            setCurrentUserState((state: StateType) => ({
                ...state,
                isLoggedIn: false
            }))
            return
        }
        doFetch()
        setCurrentUserState((state: StateType) => ({
            ...state,
            isLoading: true
        }))
    }, [])

    useEffect(() => {
        if (!response) {
            return
        }
        setCurrentUserState((state: StateType) => ({
            ...state,
            isLoggedIn: true,
            isLoading: false,
            currentUser: response.user
        }))
    }, [response, setCurrentUserState])

    return children
}