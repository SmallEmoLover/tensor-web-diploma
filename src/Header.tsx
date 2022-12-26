import { KeyboardEvent, useState } from "react"
import { useNavigate } from "react-router-dom";

/**
 * Компонент-рендер шапки страницы
 */
export default function Header() {
    const [inputValue, setInputValue] = useState('');
    const navigate = useNavigate();

    const onKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const search = () => {
        if (inputValue !== '') {
            navigate(`search/${inputValue}`);
        }
    }

    return (
        <header className="header">
            <div className="header__logo">
                Last.fm
            </div>
            <div className="header__search">
                <button className="header__search-button"
                    onClick={() => {search()}}
                />
                <input className="header__search-input" 
                    placeholder="Search here for music"
                    onChange={(event) => {setInputValue(event.target.value)}}
                    onKeyDown={onKeyDown}
                />
            </div>
        </header>
    )
}