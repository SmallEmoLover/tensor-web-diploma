import { generateImageUrl, openNewTab } from "../utils";
import "./Card.css";
import { CARD_IMAGE_SIZE } from "./Constants";

interface ICardProps {
    title: string;
    description: string; 
    url: string;
}

/**
 * Компонент-рендер карточки
 */
export default function Card({ title, description, url}: ICardProps) {
    return (
        <div className="card"
            onClick={() => { openNewTab(url) }}
            style={{backgroundImage: `url(${generateImageUrl(CARD_IMAGE_SIZE)})`}}     
        >
            <div className="card__title">
                { title }
            </div>
            <div className="card__description">
                { description }
            </div>
        </div>
    )
}