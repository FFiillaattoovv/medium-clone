import {ArticleForm} from "../../components/ArticleForm";

export const CreateArticle = () => {
    return (
        <div>
            <ArticleForm onSubmit={() => {}} initialValues={{article: 'NEW ARTICLE'}}/>
        </div>
    )
}