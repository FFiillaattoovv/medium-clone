import {useEffect, useState} from "react";
import axios from "axios";

export const useFetch = (url: string) => {
    const baseUrl = 'https://api.realworld.io/api'
    const [response, setResponse] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [options, setOptions] = useState({})

    const doFetch = (options = {}): void => {
        setOptions(options)
        setIsLoading(true)
    }

    useEffect(() => {
        if (!setIsLoading) {
            return
        }

        axios(baseUrl + url, options)
            .then((res: any) => {
                console.log('res', res)
                setIsLoading(false)
                setResponse(res.data)
            })
            .catch(error => {
                console.log('error', error)
                setIsLoading(false)
                setError(error.response.data)
            })
    }, [isLoading])

    return [{response, isLoading, error}, doFetch] as Array<ResponseType>
}

type ResponseType = {response: null, isLoading: boolean, error: null} & Function