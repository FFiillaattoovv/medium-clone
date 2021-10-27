import React, {FormEvent, useContext, useEffect, useState} from "react";
import {ContextType, CurrentUserContext} from "../../contexts/CurrentUser";
import {HookResponseType, useFetch} from "../../hooks/useFetch";
import {BackendErrorMessages} from "../../components/BackendErrorMessages";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {Redirect} from "react-router-dom";

export const Settings = () => {
    const apiUrl = '/user'
    const [{response, error}, doFetch] = useFetch(apiUrl) as Array<HookResponseType>
    const [currentUserState, dispatch] = useContext(CurrentUserContext) as ContextType
    const [, setToken] = useLocalStorage('token')
    const [isSuccessfulLogout, setIsSuccessfulLogout] = useState(false)

    const [image, setImage] = useState<string | undefined>('')
    const [username, setUsername] = useState('')
    const [bio, setBio] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        doFetch({
            method: "PUT",
            data: {
                user: {
                    ...currentUserState.currentUser,
                    image,
                    username,
                    bio,
                    email,
                    password
                }
            }
        })
    }
    const logout = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault()

        setToken('')
        dispatch({type: "LOGOUT"})
        setIsSuccessfulLogout(true)
    }

    useEffect(() => {
        if (!currentUserState.currentUser) {
            return
        }
        setImage(currentUserState.currentUser.image)
        setUsername(currentUserState.currentUser.username)
        setBio(currentUserState.currentUser.bio)
        setEmail(currentUserState.currentUser.email)
    }, [currentUserState.currentUser])

    useEffect(() => {
        if (!response) {
            return
        }

        dispatch({type: 'SET_AUTHORIZED', payload: response.user})
    }, [response, dispatch])

    if (isSuccessfulLogout) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className="settings-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Your settings</h1>
                        {error && <BackendErrorMessages backendErrors={error.errors}/>}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder={'Url of profile picture'}
                                           value={image}
                                           onChange={(e) => setImage(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder={'User name'}
                                           value={username}
                                           onChange={(e) => setUsername(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea rows={8} className="form-control form-control-lg"
                                              placeholder={'Short bio'}
                                              value={bio}
                                              onChange={(e) => setBio(e.target.value)}>
                                    </textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control  form-control-lg"
                                           placeholder={'Email'}
                                           value={email}
                                           onChange={(e) => setEmail(e.target.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="password" className="form-control  form-control-lg"
                                           autoComplete="new-password"
                                           placeholder={'Password'}
                                           value={password}
                                           onChange={(e) => setPassword(e.target.value)}/>
                                </fieldset>
                                <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                                    Update settings
                                </button>
                            </fieldset>
                        </form>
                        <hr/>
                        <button type="submit" className="btn btn-outline-danger" onClick={logout}>
                            Or click here to logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}