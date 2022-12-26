import { ISearchTrack as ITrack } from "../interfaces";
import { generateImageUrl, openNewTab } from "../utils";
import { TRACK_IMAGE_SIZE } from "./Constants";
import "./Tracks.css";

/**
 * Компонент-рендер списка найденных треков
 */
export default function Tracks({ tracks }: { tracks: ITrack[] }) {
    return (
        <div className="search-list__tracks">
            {
                tracks.map((track) => {
                    return (
                        <div className="track"
                            onClick={() => { openNewTab(track.url) }}
                            key={track.url}
                        >
                            <div className="track__avatar"
                                style={{backgroundImage: `url(${generateImageUrl(TRACK_IMAGE_SIZE)})`}}
                            />
                            <div className="track__title">
                                { track.name }
                            </div>
                            <div className="track__author">
                                { track.artist }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}