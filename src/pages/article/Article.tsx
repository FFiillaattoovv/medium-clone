import React, {FC, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {HookResponseType, useFetch} from "../../hooks/useFetch";
import {Loading} from "../../components/Loading";
import {ErrorMessage} from "../../components/ErrorMessage";
import {TagList} from "../../components/TagList";

export const Article: FC<ArticleTypeProps> = ({match}) => {
    const slug = match.params.slug
    const apiUrl = `/articles/${slug}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl) as Array<HookResponseType>

    useEffect(() => {
        doFetch()
    }, [doFetch])


    if (!isLoading && response && Object.keys(response.article).length === 0) {
        return <div className="article-preview">No articles are here... yet.</div>
    }
    return (
        <div className="article-page">
            <div className="banner">
                {!isLoading && response && (
                    <div className="container">
                        <h1>{response.article.meta}</h1>
                        <div className="article-meta">
                            <Link to={`/profiles/${response.article.author.username}`}>
                                <img src={response.article.author.image} alt=""/>
                            </Link>
                        </div>
                        <div className="info">
                            <Link to={`/profiles/${response.article.author.username}`}>
                                {response.article.author.username}
                                <span className="date">{response.article.createdAt}</span>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
            <div className="container page">
                {isLoading && <Loading/>}
                {error && <ErrorMessage/>}
                {!isLoading && response && (
                    <div className="row article-content">
                        <div className="col-xs-12">
                            <div>
                                <p>{response.article.body}</p>
                            </div>
                            <TagList tags={response.article.tagList}/>
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