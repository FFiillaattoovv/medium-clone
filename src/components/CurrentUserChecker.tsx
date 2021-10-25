import {useFetch} from "../hooks/useFetch";
import {ContextType, CurrentUserContext} from "../contexts/CurrentUser";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {useContext, useEffect} from "react";

export const CurrentUserChecker = ({children}: any) => {
    const [{response}, doFetch] = useFetch('/user')
    const [, dispatch] = useContext(CurrentUserContext) as ContextType
    const [token] = useLocalStorage('token')

    useEffect(() => {
        if (!token) {
            dispatch({type: 'SET_UNAUTHORIZED'})
            return
        }
        doFetch()
        dispatch({type: 'LOADING'})
    }, [doFetch, dispatch, token])

    useEffect(() => {
        if (!response) {
            return
        }
        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    }, [response, dispatch])

    return children
}