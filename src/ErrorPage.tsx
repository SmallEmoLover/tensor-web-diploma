import { Link } from "react-router-dom";
import "./ErrorPage.css";

/**
 * Компонент-рендер страницы-ошибки
 */
export default function ErrorPage() {
    return (
        <div className="errorPage">
            <div> Ой, вы куда-то не туда попали, знаете</div>
            <Link to={'/'}> Давайте вернёмся на главную  </Link>
        </div>
    );
}
