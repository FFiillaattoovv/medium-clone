import {Link} from "react-router-dom"

export const Feed = ({articles}: ArticlesType) => {
    return (
        <div>
            {articles.map((article, index) => (
                <div className="article-preview" key={index}>
                    <div className="article-meta">
                        <Link to={`/profiles/${article.author.username}`}>
                            <img src={article.author.image} alt=""/>
                        </Link>
                    </div>
                    <div className="info">
                        <Link to={`/profiles/${article.author.username}`} className="author">
                            {article.author.username}
                        </Link>
                        <span className="date">{article.createdAt}</span>
                    </div>
                    <Link to={`/articles/${article.slug}`} className="preview-link">
                        <h1>{article.title}</h1>
                        <p>{article.description}</p>
                        <span>Read more...</span>
                        <ul className="tag-list">
                            {article.tagList.map(tag => (
                                <li className="tag-default tad-pill tag-outline">
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    </Link>
                </div>
            ))}
        </div>
    )
}

export type ArticleType = {
    slug: string,
    title: string,
    description: string,
    body: string,
    tagList: string[],
    createdAt: string,
    updatedAt: string,
    favorited: boolean,
    favoritesCount: number,
    author: {
        username: string,
        bio: string,
        image: string,
        following: boolean
    }
}
type ArticlesType = { articles: Array<ArticleType> }
