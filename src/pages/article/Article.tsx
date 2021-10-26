import React, {FC, useContext, useEffect, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {HookResponseType, useFetch} from "../../hooks/useFetch";
import {Loading} from "../../components/Loading";
import {ErrorMessage} from "../../components/ErrorMessage";
import {TagList} from "../../components/TagList";
import {ContextType, CurrentUserContext} from "../../contexts/CurrentUser";

export const Article: FC<ArticleTypeProps> = ({match}) => {
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{
        response: fetchArticleResponse,
        isLoading: fetchArticleIsLoading,
        error: fetchArticleError
    }, doFetch] = useFetch(apiUrl) as Array<HookResponseType>
    const [{response: deleteArticleResponse}, doDeleteArticle] = useFetch(apiUrl) as Array<HookResponseType>
    const [currentUserState] = useContext(CurrentUserContext) as ContextType
    const [isSuccessfulDelete, setIsSuccessfulDelete] = useState(false)

    const isAuthor = () => {
        if (!fetchArticleResponse || !currentUserState.isLoggedIn) {
            return false
        }
        return (
            fetchArticleResponse.article.author.username === currentUserState.currentUser?.username
        )
    }
    const deleteArticle = () => {
        doDeleteArticle({
            method: "DELETE"
        })
    }

    useEffect(() => {
        doFetch()
    }, [doFetch])

    useEffect(() => {
        if (deleteArticleResponse && deleteArticleResponse.status === 204) {
            setIsSuccessfulDelete(true)
        }
    }, [deleteArticleResponse])

    if (isSuccessfulDelete) {
        return <Redirect to={'/'}/>
    }

    if (!fetchArticleIsLoading && fetchArticleResponse && Object.keys(fetchArticleResponse.article).length === 0) {
        return <div className="article-preview">No articles are here... yet.</div>
    }
    return (
        <div className="article-page">
            <div className="banner">
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className="container">
                        <h1>{fetchArticleResponse.article.title}</h1>
                        <div className="article-meta">
                            <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                                <img src={fetchArticleResponse.article.author.image} alt=""/>
                            </Link>
                            <div className="info">
                                <Link to={`/profiles/${fetchArticleResponse.article.author.username}`}>
                                    {fetchArticleResponse.article.author.username}
                                </Link>
                                <span className="date">{fetchArticleResponse.article.createdAt}</span>
                            </div>
                            {isAuthor() && (
                                <span>
                                <Link to={`/articles/${fetchArticleResponse.article.slug}/edit`}
                                      className="btn btn-outline-secondary btn-sm">
                                <i className="ion-edit">

                                </i>
                                    Edit article
                                </Link>
                                <button onClick={deleteArticle} className="btn btn-outline-danger btn-sm">
                                    <i className="ion-trash-a">

                                    </i>
                                    Delete article
                                </button>
                            </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <div className="container page">
                {fetchArticleIsLoading && <Loading/>}
                {fetchArticleError && <ErrorMessage/>}
                {!fetchArticleIsLoading && fetchArticleResponse && (
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <div>
                                <p>{fetchArticleResponse.article.body}</p>
                            </div>
                            <TagList tags={fetchArticleResponse.article.tagList}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

type DetailParams = {
    params: {
        slug: string
    }
}

type ArticleTypeProps = {
    match: DetailParams
}