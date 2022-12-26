import { IArtist } from "../interfaces";
import Card from "./Card";

/**
 * Компонент-рендер списка карточек артистов
 */
export default function Artists({ artists }: { artists: IArtist[] }) {
    return (
        <div className="search-list search-list__artists">
            { 
                artists.map((artist) => {
                    return (
                        <Card title={artist.name} 
                            description={`${artist.listeners} listeners`}
                            url={artist.url}
                            key={artist.url}
                        />
                    )
                })
            }
        </div>
    )
}