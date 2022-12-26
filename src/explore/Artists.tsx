import { IArtist } from "../interfaces";
import { generateImageUrl, openNewTab } from "../utils";
import { ARTIST_AVATAR_SIZE } from "./Constants";
import "./Artists.css";

/**
 * Компонент-рендер списка артистов
 */
export default function Artists({ artists } : { artists: IArtist[]}) {
    return (
        <div className="artists-list">
            { artists.map((artist: IArtist) => {
                return (
                    <div className="artists-list__artist-card"
                        onClick={() => { openNewTab(artist.url); }}
                        key={artist.url}
                    >
                        <div className="artists-list__avatar"
                            style={{backgroundImage: `url(${generateImageUrl(ARTIST_AVATAR_SIZE)})`}}
                        />
                        <div className="artists-list__artist-name">
                            { artist.name }
                        </div>
                    </div>
                )
            }) }
        </div>
    )
}