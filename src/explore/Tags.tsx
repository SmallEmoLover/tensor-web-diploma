import { ITag } from "../interfaces";
import { generateImageUrl, openNewTab } from "../utils";
import { BIG_TAG_IMAGE_SIZE, TAG_IMAGE_SIZE } from "./Constants";
import "./Tags.css";

/**
 * Компонент-рендер списка тегов
 */
export default function Tags({ tags }: { tags: ITag[] }) {
    return(
        <div className="tag-list">
            {
                tags[0] ? (
                    <div className="tag-list__tag tag-list__tags-container_big"
                        style={{backgroundImage: `url(${generateImageUrl(BIG_TAG_IMAGE_SIZE)})`}}
                        onClick={() => { openNewTab(tags[0].url) }}
                    >
                        { tags[0].name }
                    </div>
                ) : null
            }
            {
                tags.slice(1).map((tag) => {
                    return (
                        <div className="tag-list__tag"
                            onClick={() => { openNewTab(tag.url) }}
                            style={{backgroundImage: `url(${generateImageUrl(TAG_IMAGE_SIZE)})`}}
                            key={tag.url}
                        >
                            { tag.name }
                        </div>
                    )
                })
            }
        </div>
    )
}
