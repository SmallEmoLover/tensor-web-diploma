import { ITrack } from "../interfaces";
import { generateImageUrl, openNewTab } from "../utils";
import { TRACK_AVATAR_SIZE } from "./Constants";
import "./Tracks.css";

/**
 * Компонент-рендер списка треков
 */
export default function Tracks({ tracks }: { tracks: ITrack[] }) {
    return(
        <div className="track-list">
            {
                tracks.map((track) => {
                    return (
                        <div className="track-list__track"
                            onClick={() => { openNewTab(track.url) }}
                            key={track.url}
                        >
                            <div className="track-list__avatar" 
                                style={{backgroundImage: `url(${generateImageUrl(TRACK_AVATAR_SIZE)})`}}
                            />
                            <div className="track-list__track_description">
                                <div className="track-list__track_name">
                                    { track.name }    
                                </div>
                                <div className="track-list__track_author"
                                    onClick={() => { openNewTab(track.artist.url) }}
                                >
                                    { track.artist.name }    
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}