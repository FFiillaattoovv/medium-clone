import {FC, FormEvent, useEffect, useState} from "react";
import {BackendErrorMessages} from "./BackendErrorMessages";

export const ArticleForm: FC<ArticleFormPropsType> = ({onSubmit, error, initialValues}) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [body, setBody] = useState('')
    const [tagList, setTagList] = useState('')

    const article: InitialValuesType = {
        title: title,
        description: description,
        body: body,
        tagList: tagList.split(' ')
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        onSubmit(article)
    }

    useEffect(() => {
        if (!initialValues) {
            return
        }
        setTitle(initialValues.title)
        setDescription(initialValues.description)
        setBody(initialValues.body)
        setTagList(initialValues.tagList.join(' '))
    }, [initialValues])

    return (
        <div className="editor-page">
            <div className="container page">
                <div className="row">
                    <div className="col-md-10 offset-md-1 col-xs-12">
                        {error && <BackendErrorMessages backendErrors={error}/>}
                        <form onSubmit={handleSubmit}>
                            <fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder={'Article title'}
                                           value={title}
                                           onChange={(e) => setTitle(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder={'What is this article about?'}
                                           value={description}
                                           onChange={(e) => setDescription(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <textarea rows={8} className="form-control"
                                              placeholder={'Write your article (in markdown)'}
                                              value={body}
                                              onChange={(e) => setBody(e.target.value)}>
                                    </textarea>
                                </fieldset>
                                <fieldset className="form-group">
                                    <input type="text" className="form-control form-control-lg"
                                           placeholder={'Enter tags'}
                                           value={tagList}
                                           onChange={(e) => setTagList(e.target.value)}/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <button type={'submit'} className="btn btn-lg pull-xs-right btn-primary">
                                        Publish Article
                                    </button>
                                </fieldset>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export type InitialValuesType = {
    title: string
    description: string
    body: string
    tagList: Array<string>
}

type ArticleFormPropsType = {
    onSubmit: (article: InitialValuesType) => void
    error?: Array<string>
    initialValues: InitialValuesType
}