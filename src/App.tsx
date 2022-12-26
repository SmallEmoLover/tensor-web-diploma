import './App.css'
import { Outlet } from "react-router-dom";
import Header from './Header';

/**
 * Компонент-рендер основы приложения
 */
export default function App() {
  return (
    <div className="app">
      <Header/>
      <main className="content">
        <Outlet/>
      </main>
      <footer className="footer">
          Это маленький футер. Здесь находятся очень важные ссылки, информация о лицензии, авторе,
          Lorem ipsum. Зачем вы это читаете? Остановитесь. Послушайте музыку, погуляйте.
          Заварите чашечку чая, посмотрите серию любимого сериала, погладьте кота, киньте собаке мячик.
          Неужели этот футер стоит вашего драгоценного времени?... 

          Хорошо, давайте поговорим. Как ваши дела?
      </footer>
    </div>
  );
}
