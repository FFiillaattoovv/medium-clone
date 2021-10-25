import React, {FC} from 'react';

export const BackendErrorMessages: FC<BackendErrorMessagesType> = ({backendErrors}) => {
    const errorMessages = Object.keys(backendErrors).map((name: symbol | string) => {
        const messages = backendErrors[name].join(' ')
        return `${String(name)} ${messages}`
    })
    return (
        <ul className="error-messages">
            {
                errorMessages.map(errorMessage => <li key={errorMessage}>{errorMessage}</li>)
            }
        </ul>
    );
}

type BackendErrorMessagesType = {
    [key: symbol | string]: Array<string>
}