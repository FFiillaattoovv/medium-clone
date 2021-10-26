import {FC} from "react";

export const TagList: FC<TagListTypeProps> = ({tags}) => {
    return (
        <ul className="tag-list">
            {tags.map(tag => (
                <li className="tag-default tad-pill tag-outline" key={tag}>
                    {tag}
                </li>
            ))}
        </ul>
    )
}

type TagListTypeProps = {
    tags: string[]
}
