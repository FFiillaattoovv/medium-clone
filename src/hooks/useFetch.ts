import {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {useLocalStorage} from "./useLocalStorage";

export const useFetch = (url: string) => {
    const baseUrl = 'https://api.realworld.io/api'
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})
    const [token] = useLocalStorage('token')

    const doFetch = useCallback((options = {}) => {
        setOptions(options)
        setIsLoading(true)
    }, [])

    useEffect(() => {
        const requestOptions = {
            ...options,
            ...{
                headers: {
                    authorization: token ? `Token ${token}` : ''
                }
            }
        }
        if (!isLoading) {
            return
        }

        axios(baseUrl + url, requestOptions)
            .then((res: any) => {
                setIsLoading(false)
                setResponse(res.data)
            })
            .catch(error => {
                setIsLoading(false)
                setError(error.response.data)
            })
    }, [isLoading, options, url, token])

    return [{response, isLoading, error}, doFetch] as Array<HookResponseType>
}

type ResponseType = {
    user: {
        bio: string | null
        email: string
        image: string
        token: string
        username: string
    }
}

type doFetchType = (options?: {}) => void

type HookResponseType = {response: ResponseType, isLoading: boolean, error: any} & doFetchType