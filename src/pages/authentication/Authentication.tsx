import React, {FormEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import {useFetch} from "../../hooks/useFetch";

export const Authentication = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [{response, isLoading, error}, doFetch] = useFetch('/users/login')

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        doFetch({
            method: "POST",
            data: {
                user: {
                    email: 'email@mail.ru',
                    password: '12345'
                }
            }
        })
    }



    return (
        <div className="auth-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-6 offset-md-3 col-xs-12">
                        <h1 className="text-xs-center">Sign in</h1>
                        <p className="text-xs-center">
                            <Link to="/register">Need an account?</Link>
                        </p>
                        <form onSubmit={handleSubmit}>
                            <fieldset>
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
                                <button className="btn btn-lg btn-primary pull-xs-right" type="submit" disabled={isLoading}>
                                    Sign in
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}