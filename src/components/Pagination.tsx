import {Link} from "react-router-dom";
import classNames from "classnames";
import {range} from "../utils/utils";

const PaginationItem = ({page, currentPage, url}: PaginationItemPropsType) => {
    const liClasses = classNames({
        'page-item': true,
        active: currentPage === page
    })
    return (
        <li className={liClasses}>
            <Link to={`${url}?page=${page}`} className="page-link">
                {page}
            </Link>
        </li>
    )
}

export const Pagination = ({total, limit, url, currentPage}: PaginationPropsType) => {
    const pagesCount = Math.ceil(total / limit)
    const pages = range(1, pagesCount)
    return (
        <ul className="pagination">
            {pages.map(page => (
                <PaginationItem page={page} currentPage={currentPage} url={url} key={page}/>
            ))}
        </ul>
    )
}

type PaginationItemPropsType = {
    page: number
    currentPage: number
    url: string
}

type PaginationPropsType = {
    total: number
    limit: number
    url: string
    currentPage: number
}