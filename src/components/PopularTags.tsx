import {HookResponseType, useFetch} from "../hooks/useFetch";
import {useEffect} from "react";
import {Loading} from "./Loading";
import {ErrorMessage} from "./ErrorMessage";
import {Link} from "react-router-dom";

export const PopularTags = () => {
    const [{response, isLoading, error}, doFetch] = useFetch('/tags') as Array<HookResponseType>
    useEffect(() => {
        doFetch()
    }, [doFetch])

    if (isLoading || !response) {
        return <Loading/>
    }
    if (error) {
        return <ErrorMessage/>
    }
    return (
        <div className="sidebar">
            <p>Popular Tags</p>
            <div className="tag-list">
                {response.tags.length ? response.tags.map((tag: string) => (
                    <Link to={`/tag/${tag}`} key={tag} className="tag-default tag-pill">
                        {tag}
                    </Link>
                )): 'No tags are here... yet.'}
            </div>
        </div>
    )
}