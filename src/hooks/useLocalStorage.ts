import {Dispatch, SetStateAction, useEffect, useState} from "react";

export const useLocalStorage = (key: string, initialValue = '') => {
    const [value, setValue] = useState(() => {
        return localStorage.getItem(key) || initialValue
    })

    useEffect(() => {
        localStorage.setItem(key, value)
    }, [value, key])

    return [value, setValue] as Array<HookLocalStorageType>
}

type setValueType = Dispatch<SetStateAction<string>>

type HookLocalStorageType = { value: string } & setValueType