import { useEffect, useState } from "react"
import { IAlbum, IArtist, ISearchTrack as ITrack } from "../interfaces";
import { makeApiRequest } from "../utils"
import Albums from "./Albums";
import Artists from "./Artists";
import Tracks from "./Tracks";
import "./Search.css";
import { useParams, Link } from "react-router-dom";
import { SEARCH_ITEM_LIMIT } from "./Constants";

interface ISearchFetchData {
    artists: IArtist[];
    albums: IAlbum[];
    tracks: ITrack[];
}

/**
 * Компонент-рендер страницы поиска
 */
export default function Search() {
    const { query } = useParams();
    const [data, setData] = useState<ISearchFetchData>({
        artists: [],
        albums: [],
        tracks: [],
    });
    const [isError, setError] = useState(false);

    useEffect(() => {
        if (!query) {
            return;
        }

        Promise.all([
            makeApiRequest('artist.search', { artist: query, limit: SEARCH_ITEM_LIMIT }),
            makeApiRequest('album.search', { album: query,  limit: SEARCH_ITEM_LIMIT }),
            makeApiRequest('track.search', { track: query, limit: SEARCH_ITEM_LIMIT }),
        ])
        // Писать интерфейсы под данные API сейчас сложно (нужные нам массивы на 2-3 уровне вложенности)
        // поэтому пока оставляю any[]
        .then((responses: any[]) => {
            setData({
                artists: responses[0].results.artistmatches.artist,
                albums: responses[1].results.albummatches.album,
                tracks: responses[2].results.trackmatches.track
            });
            setError(false);
        }).catch(() => {
            setError(true);
        })
    }, [query]);

    if (isError) {
        return (
            <div>
                Произошла ошибка. Попробуйте перезагрузить страницу.
            </div>
        )
    }

    return (
        <div className="search-content">
            <Link to="/" className="search-content__back-link"> Вернуться на главную </Link>
            <h1 className="search-content__header search-content__header-query"> </h1>
            <section className="search-section">
                <h2 className="serach-section__header"> Artists </h2>
                <Artists artists={data.artists}/>
            </section>

            <section className="search-section">
                <h2 className="serach-section__header"> Albums </h2>
                <Albums albums={data.albums}/>
            </section>

            <section className="search-section">
                <h2 className="serach-section__header"> Tracks </h2>
                <Tracks tracks={data.tracks}/>
            </section>
        </div>
    )
}
