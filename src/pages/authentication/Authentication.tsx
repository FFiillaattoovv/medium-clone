import React, {FormEvent, useContext, useEffect, useState} from 'react';
import {Link, Redirect, RouteComponentProps} from 'react-router-dom';
import {useFetch} from "../../hooks/useFetch";
import {useLocalStorage} from "../../hooks/useLocalStorage";
import {ContextType, CurrentUserContext, StateType} from "../../contexts/CurrentUser";

export const Authentication = (props: RouteComponentProps) => {
    const isLogin = props.match.path === '/login'
    const pageTitle = isLogin ? 'Sign In' : 'Sign Up'
    const descriptionLink = isLogin ? '/register' : '/login'
    const descriptionText = isLogin ? 'Need an account?' : 'Have an account?'
    const apiUrl = isLogin ? '/users/login' : '/users'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [username, setUsername] = useState('')
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
    const [currentUserState, setCurrentUserState] = useContext(CurrentUserContext) as ContextType
    const [{response, isLoading}, doFetch] = useFetch(apiUrl)
    const [token, setToken] = useLocalStorage('token')

    console.log(currentUserState)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = isLogin ? {email, password} : {username, email, password}
        doFetch({
            method: "POST",
            data: {
                user: user
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        } else {
            setToken(response.user.token)
            setIsSuccessfulSubmit(true)
            setCurrentUserState((state: StateType) => ({
                ...state,
                isLoggedIn: true,
                isLoading: false,
                currentUser: response.user
            }))
        }
    }, [response, setToken])

    if (isSuccessfulSubmit) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">{pageTitle}</h1>
                        <p className="text-xs-center">
                            <Link to={descriptionLink}>{descriptionText}</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                {
                                    !isLogin &&
                                    <fieldset className="form-group">
                                        <input
                                            type="text"
                                            className="form-control form-control-lg"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUsername(e.currentTarget.value)}
                                        />
                                    </fieldset>
                                }
                                <fieldset className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.currentTarget.value)}
                                    />
                                </fieldset>
                                <fieldset className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.currentTarget.value)}
                                    />
                                </fieldset>
                                <button className="btn btn-lg btn-primary pull-xs-right" type="submit"
                                        disabled={isLoading}>
                                    {pageTitle}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}