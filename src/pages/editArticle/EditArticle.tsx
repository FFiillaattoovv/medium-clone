import React, {FC, useContext, useEffect, useState} from "react";
import {Redirect, RouteComponentProps} from "react-router-dom";
import {useFetch} from "../../hooks/useFetch";
import {ArticleForm, InitialValuesType} from "../../components/ArticleForm";
import {ContextType, CurrentUserContext} from "../../contexts/CurrentUser";

export const EditArticle: FC<RouteComponentProps<ParamsType>> = ({match}) => {
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{response: fetchArticleResponse}, doFetchArticle] = useFetch(apiUrl)
    const [currentUserState] = useContext(CurrentUserContext) as ContextType
    const [{response: updateArticleResponse, error: updateArticleError}, doUpdateArticle] = useFetch(apiUrl)
    const [initialValues, setInitialValues] = useState<InitialValuesType>(null)
    const [isSuccessfulSubmit, setIsSuccessfulSubmit] = useState(false)


    const handleSubmit = (article: InitialValuesType) => {
        doUpdateArticle({
            method: "PUT",
            data: {
                article
            }
        })
    }

    useEffect(() => {
        doFetchArticle()
    }, [doFetchArticle])

    useEffect(() => {
        if (!fetchArticleResponse) {
            return
        }
        setInitialValues({
            title: fetchArticleResponse.article.title,
            description: fetchArticleResponse.article.description,
            body: fetchArticleResponse.article.body,
            tagList: fetchArticleResponse.article.tagList
        })
    }, [fetchArticleResponse])

    useEffect(() => {
        if (!updateArticleResponse) {
            return
        }
        setIsSuccessfulSubmit(true)
    }, [updateArticleResponse])

    if (currentUserState.isLoggedIn === false) {
        return <Redirect to={'/'}/>
    }

    if (isSuccessfulSubmit) {
        return <Redirect to={`/articles/${slug}`}/>
    }

    return (
        <ArticleForm onSubmit={handleSubmit} initialValues={initialValues}
                     error={(updateArticleError && updateArticleError.error) || {}}/>
    )
}

type ParamsType = { slug: string }