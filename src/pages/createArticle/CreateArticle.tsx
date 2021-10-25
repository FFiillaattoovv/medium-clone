import {ArticleForm, InitialValuesType} from "../../components/ArticleForm";
import {useFetch} from "../../hooks/useFetch";
import {useContext, useEffect, useState} from "react";
import {Redirect} from "react-router-dom";
import {ContextType, CurrentUserContext} from "../../contexts/CurrentUser";

export const CreateArticle = () => {
    const apiUrl = '/articles'
    const [{response, error}, doFetch] = useFetch(apiUrl)
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)
    const [currentUserState] = useContext(CurrentUserContext) as ContextType
    const initialValues: InitialValuesType = {
        title: '',
        description: '',
        body: '',
        tagList: []
    }

    const handleSubmit = (article: InitialValuesType) => {
        doFetch({
            method: 'post',
            data: {
                article
            }
        })
    }

    useEffect(() => {
        if (!response) {
            return
        }
        setIsSuccessfulSubmit(true)
    }, [response])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to={'/'}/>
    }

    if (isSuccessfulSubmit) {
        return <Redirect to={`/articles/${response.article.slug}`}/>
    }

    return (
        <div>
            <ArticleForm onSubmit={handleSubmit} error={(error && error.errors) || {}} initialValues={initialValues}/>
        </div>
    )
}