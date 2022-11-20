import showExplorePage from './explorePage.js';
import showSearchPage from './searchPage.js';
const app = document.getElementsByClassName("content")[0];
showExplorePage(app);
const searchButton = document.getElementsByClassName("header__search-button")[0];
const searchInput = document.getElementsByClassName("header__search-input")[0];
searchButton.addEventListener('click', () => search());
// Добавим поиск также на нажатие Enter в инпуте.
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        search();
    }
});
/**
 * Инициирует поиск
 */
function search() {
    if (searchInput.value) {
        showSearchPage(app, searchInput.value);
    }
}
