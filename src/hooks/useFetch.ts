import {useEffect, useState} from "react";
import axios from "axios";

export const useFetch = (url: string) => {
    const baseUrl = 'https://api.realworld.io/api'
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})

    const doFetch = (options = {}) => {
        setOptions(options)
        setIsLoading(true)
    }

    useEffect(() => {
        if (!setIsLoading) {
            return
        }

        axios(baseUrl + url, options)
            .then((res: any) => {
                setIsLoading(false)
                setResponse(res.data)
            })
            .catch(error => {
                setIsLoading(false)
                setError(error.response.data)
            })
    }, [isLoading, options, url])

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

type HookResponseType = {response: ResponseType, isLoading: boolean, error: null} & doFetchType