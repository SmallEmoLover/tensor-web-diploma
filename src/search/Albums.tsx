import { IAlbum } from "../interfaces";
import Card from "./Card";

/**
 * Компонент-рендер списка карточек альбомов
 */
export default function Albums({ albums }: { albums: IAlbum[] }) {
    return (
        <div className="search-list search-list__albums">
            {
                albums.map((album) => {
                    return (
                        <Card title={album.name} 
                            description={album.artist}
                            url={album.url}
                            key={album.url}
                        />
                    )
                })
            }
        </div>
    )
}