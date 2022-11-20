import { IAlbum, IArtist, ISearchTrack } from "./interfaces.js";
import { createElement, generateImageUrl, getItterableArrayByClassName, makeApiRequest, showNotification } from "./utils.js";

/**
 * Первоначальное наполнение страницы
 */
const BASE_PAGE_LAYOUT = `
    <div class="search-content">
        <h1 class="search-content__header search-content__header-query"> </h1>
        <section class="search-section">
            <h2 class="serach-section__header"> Artists </h2>
            <div class="search-list search-list__artists">

                <!-- Тут будут карточки исполнителей -->

            </div>
        </section>
        <section class="search-section">
            <h2 class="serach-section__header"> Albums </h2>
            <div class="search-list search-list__albums">

                <!-- Тут будут карточки альбомов -->

            </div>
        </section>
        </section>
        <section class="search-section">
            <h2 class="serach-section__header"> Tracks </h2>
            <div class="search-list__tracks">

                <!-- Тут будет список треков -->

            </div>
        </section>
    </div>
`

// Количество отображаемых в разделе карточек
const CARD_AMOUNT = 6; 

// Размер изображения в карточке
const CARD_IMAGE_SIZE = 200;

// Размер изображения в колонке трека
const TRACK_IMAGE_SIZE = 50;

/**
 * Рендер страницы поиска
 * @param app - элемент, в который встраиваем
 * @param query - запрос для поиска
 */
export default function showSearchPage(app: Element, query: string): void {
    app.innerHTML = BASE_PAGE_LAYOUT;
    const header = app.getElementsByClassName('search-content__header-query')[0];
    header.append(`Search result for "${query}"`);

    Promise.all([
        fillArtists(app, query), 
        fillAlbums(app, query), 
        fillTracks(app, query)
    ]).then((_) => {
        // Запрашиваем тут чтобы не затягивать загрузку данных долгой загрузкой картинок
        getItterableArrayByClassName('card').forEach((card) => {
            card.style.backgroundImage = `url('${generateImageUrl(CARD_IMAGE_SIZE)}')`
        });

        getItterableArrayByClassName('track__avatar').forEach((avatar) => {
            avatar.style.backgroundImage = `url('${generateImageUrl(TRACK_IMAGE_SIZE)}')`
        });
    });
}

/**
 * Запрашивает и заполянет артистов в контейнер search-list__artists
 * @param app - базовый контейнер страницы
 * @param query - запрос для поиска
 */
function fillArtists(app: Element, query: string) {
    const artistsList = app.getElementsByClassName('search-list__artists')[0];
    
    return makeApiRequest('artist.search', {artist: query}).then((response) => {
        artistsList.innerHTML = '';
        const artists = response.results.artistmatches.artist as Array<IArtist>;
        artists.slice(0, CARD_AMOUNT)
            .forEach((artist) => {
                artistsList.append(
                    makeArtistCard(artist)
                );
            })
    }).catch(() => {
        showNotification('При загрузке артистов произошла ошибка.')    
    });
}

/**
 * Создаёт HTML элемент - карточку артиста
 * @param artist
 */
function makeArtistCard(artist: IArtist): Element {
    const card = createElement('div', 'card');
    const title = createElement('div', 'card__title');
    const description = createElement('div', 'card__description');

    title.append(artist.name);
    description.append(`${artist.listeners} listeners`);

    card.append(title);
    card.append(description);

    card.addEventListener('click', () => {
        window?.open(artist.url, '_blank')?.focus();
    })

    return card;
}

/**
 * Запрашивает и заполянет артистов в контейнер search-list__artists
 * @param app - базовый контейнер страницы
 * @param query - запрос для поиска
 */
function fillAlbums(app: Element, query: string) {
    const albumsList = app.getElementsByClassName('search-list__albums')[0];
    
    return makeApiRequest('album.search', {album: query}).then((response) => {
        albumsList.innerHTML = '';
        const albums = response.results.albummatches.album as Array<IAlbum>;
        albums.slice(0, CARD_AMOUNT)
            .forEach((album) => {
                albumsList.append(
                    makeAlbumCard(album)
                );
            })
    }).catch(() => {
        showNotification('При загрузке альбомов произошла ошибка.')    
    });;  
}

/**
 * Создаёт HTML элемент - карточку альбома
 * @param album
 */
function makeAlbumCard(album: IAlbum) {
    const card = createElement('div', 'card');
    const title = createElement('div', 'card__title');
    const description = createElement('div', 'card__description');

    title.append(album.name);
    description.append(album.artist);

    card.append(title);
    card.append(description);

    card.addEventListener('click', () => {
        window?.open(album.url, '_blank')?.focus();
    })

    return card;
}

/**
 * Запрашивает и заполянет треки в контейнер search-list__tracks
 * @param app - базовый контейнер страницы
 * @param query - запрос для поиска
 */
function fillTracks(app: Element, query: string) {
    const trackList = app.getElementsByClassName('search-list__tracks')[0];

    return makeApiRequest('track.search', {track: query}).then((response) => {
    trackList.innerHTML = '';
    const tracks = response.results.trackmatches.track as Array<ISearchTrack>;
    
    tracks.slice(0, CARD_AMOUNT)
        .forEach((track) => {
            trackList.append(
                makeTrackRow(track)
            );
        })
    }).catch(() => {
        showNotification('При загрузке треков произошла ошибка.')    
    });;
}

/**
 * Создаёт HTML элемент трека
 * @param track
 */
function makeTrackRow(track: ISearchTrack) {
    const trackRow = createElement('div', 'track');
    const avatar = createElement('div', 'track__avatar');
    const title = createElement('div', 'track__title');
    const author = createElement('div', 'track__author');

    author.append((track.artist) as unknown as string);
    title.append(track.name);

    trackRow.append(avatar);
    trackRow.append(title);
    trackRow.append(author);

    trackRow.addEventListener('click', () => {
        window?.open(track.url, '_blank')?.focus();
    })

    return trackRow;
}
