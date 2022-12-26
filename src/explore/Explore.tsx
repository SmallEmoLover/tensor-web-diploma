import { useEffect, useState } from "react";
import { IArtist, ITag, ITrack } from "../interfaces";
import { makeApiRequest } from "../utils";
import { TAGS_LIMIT, ARTISTS_LIMIT, TRACKS_LIMIT } from "./Constants";
import Artists from "./Artists";
import Tags from "./Tags";
import Tracks from "./Tracks";
import "./Explore.css";

interface IExploreFetchData {
    tags: ITag[];
    artists: IArtist[];
    tracks: ITrack[];
}

/**
 * Компонент-рендер страницы Explore
 */
export function Explore() {
    const [data, setData] = useState<IExploreFetchData>({
        tags: [],
        artists: [],
        tracks: []
    });
    const [isError, setError] = useState(false);

    useEffect(() => {
        Promise.all([
            makeApiRequest('chart.gettoptags', { limit: TAGS_LIMIT }),
            makeApiRequest('chart.gettopartists', { limit: ARTISTS_LIMIT }),
            makeApiRequest('chart.gettoptracks', { limit: TRACKS_LIMIT }),
        ])
        // Писать интерфейсы под данные API сейчас сложно (нужные нам массивы на 2-3 уровне вложенности)
        // поэтому пока оставляю any[]
        .then((responses: any[]) => {
            setData({
                tags: responses[0].tags.tag,
                artists: responses[1].artists.artist,
                tracks: responses[2].tracks.track
            });
            setError(false);
        }).catch(() => {
            setError(true);
        })
    }, [])

    if (isError) {
        return (
            <div>
                Произошла ошибка. Попробуйте перезагрузить страницу.
            </div>
        )
    }

    return (
        <div className="explore-content">
            <h1 className="content__header"> Music </h1>

            <section className="section">
                <h2 className="section__header"> Explore tags </h2>
                <hr className="section__divider"/>
                <Tags tags={data.tags}/>
            </section>
            
            <section className="section">
                <h2 className="section__header"> Hot right now </h2>
                <hr className="section__divider"/>
                <Artists artists={data.artists}/>
            </section>
            
            <section className="section">
                <h2 className="section__header"> Popular tracks </h2>
                <hr className="section__divider"/>
                <Tracks tracks={data.tracks}/>
            </section>
        </div>
    );
}