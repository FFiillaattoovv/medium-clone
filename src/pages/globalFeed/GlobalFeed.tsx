import React, {useEffect} from 'react';
import {HookResponseType, useFetch} from "../../hooks/useFetch";
import {Feed} from "../../components/Feed";
import {Pagination} from "../../components/Pagination";
import {getPaginator, limit} from "../../utils/utils";
import {RouteComponentProps} from "react-router-dom";
import {stringify} from "query-string";

export const GlobalFeed = ({location, match}: RouteComponentProps) => {
    const {currentPage, offset} = getPaginator(location.search)
    const stringifiedParams = stringify({
        limit,
        offset
    })
    const apiUrl = `/articles?${stringifiedParams}`
    const [{response, isLoading, error}, doFetch] = useFetch(apiUrl) as Array<HookResponseType>
    const url = match.url

    useEffect(() => {
        doFetch()
    }, [doFetch])
    return (
        <div className="home-page">
            <div className="banner">
                <div className="container">
                    <h1>Medium clone</h1>
                    <p>A place to share knowledge</p>
                </div>
            </div>
            <div className="container page">
                <div className="row">
                    <div className="col-md-9">
                        {isLoading && <div>Loading...</div>}
                        {error && <div>Some error happened</div>}
                        {!isLoading && response && (
                            <>
                                <Feed articles={response.articles}/>
                                <Pagination total={response.articlesCount} limit={limit} url={url} currentPage={currentPage}/>
                            </>
                        )}
                    </div>
                    <div className="col-md-3">
                        Popular tags
                    </div>
                </div>
            </div>
        </div>
    );
}