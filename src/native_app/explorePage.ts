import {makeApiRequest, createElement, getItterableArrayByClassName, generateImageUrl, showNotification} from './utils.js';
import {IArtist, ITag, ITrack} from './interfaces.js';

/**
 * Базовая вёрстка страницы
 */
const BASE_PAGE_LAYOUT = `
    <div class="explore-content">
        <h1 class="content__header"> Music </h1>
        <section class="section">
            <h2 class="section__header"> Explore tags </h2>
            <hr class="section__divider"/>
            <div class="tag-list">

                <!-- Здесь будут теги -->

            </div>
        </section>
        <section class="section">
            <h2 class="section__header"> Hot right now </h2>
            <hr class="section__divider"/>
            <div class="artists-list">

                <!-- Здесь будут артисты -->

            </div>
        </section>
        <section class="section">
            <h2 class="section__header"> Popular tracks </h2>
            <hr class="section__divider"/>
            <div class="track-list">

                <!-- Здесь будут треки -->

            </div>
        </section>
    </div>
`
// Количество отображаемых артистов
const ARTIST_AMOUNT = 10;

// Количество отображаемых тэгов
const TAGS_AMOUNT = 10;

// Количество отображаемых треков
const TRACKS_AMOUNT = 9;

// Размер маленького изображения
const SMALL_IMAGE_SIZE = 200;

// Размер большого изображения
const BIG_IMAGE_SIZE = 700;

/**
 * Рендер страницы 'Explore'
 * @param {HTMLElement} app - элемент, в который будет встроена страница. 
 */
export default function showExplorePage(app: Element) {
    app.innerHTML = BASE_PAGE_LAYOUT;
    
    Promise.all([fillTags(app), fillArtists(app), fillTracks(app)]).then((_) => {
        // Картинки загружать дольше всего, поэтому будем грузить после загрузки контента
        let elements: Array<HTMLElement> = [];

        // Для контейнера с большим тегом нужна большая картинка
        const bigTagClass = "tag-list__tags-container_big"
        const bigTagContainer = app.getElementsByClassName(bigTagClass)[0] as HTMLElement;
        bigTagContainer.style.backgroundImage = `url('${generateImageUrl(BIG_IMAGE_SIZE)}')`;

        elements = elements.concat(
            getItterableArrayByClassName('tag-list__tag').filter((tag) => {
                return !tag.classList.contains('tag-list__tags-container_big');
            }),
            getItterableArrayByClassName('artists-list__avatar'),
            getItterableArrayByClassName('track-list__avatar')
        );

        elements.forEach((element) => {
            element.style.backgroundImage = `url('${generateImageUrl(SMALL_IMAGE_SIZE)}')`
        });
    });
}

/**
 * Запрашивает и заполянет теги в контейнер tag-list
 * @param app - базовый контейнер страницы
 */
function fillTags(app: Element): Promise<void> {
    const tagList = app.getElementsByClassName('tag-list')[0];
    tagList.innerHTML = '';

    return makeApiRequest('chart.gettoptags').then((tagsJson) => {
        const tags = tagsJson.tags.tag as Array<ITag>;

        /* Первый тег - большой на 9 ячеек.
           Отдельно его создадим и обработаем */ 
        const bigTagContainer = document.createElement('div');
        const bigTag = tags[0];

        bigTagContainer.className = "tag-list__tag tag-list__tags-container_big";
        bigTagContainer.append(bigTag.name);
        bigTagContainer.addEventListener('click', () => {
            window?.open(bigTag.url, '_blank')?.focus();
        })

        tagList.append(bigTagContainer);

        tags.slice(1, TAGS_AMOUNT).forEach((tag) => {
            tagList.append(
                makeTagContainer(tag)
            )
        });
    }).catch(() => {
        showNotification('При загрузке тегов произошла ошибка.')    
    });
}

/**
 * Создаёт HTML элемент тега
 * @param tag
 */
function makeTagContainer(tag: ITag): Element {
    const tagContainer = document.createElement('div');
    tagContainer.className = "tag-list__tag";
    tagContainer.append(tag.name)
    tagContainer.addEventListener('click', () => {
        window?.open(tag.url, '_blank')?.focus();
    })

    return tagContainer;
}

/**
 * Запрашивает и заполянет артистов в контейнер artists-list
 * @param app - базовый контейнер страницы
 */
function fillArtists(app: Element): Promise<void> {
    const artistsList = app.getElementsByClassName('artists-list')[0];

    return makeApiRequest('chart.gettopartists').then((response) => {
        artistsList.innerHTML = '';
        const artists = response.artists.artist as Array<IArtist>;
        artists.slice(0, ARTIST_AMOUNT)
            .forEach((artist) => {
                artistsList.append(
                    makeArtistCard(artist)
                );
            })
    }).catch(() => {
        showNotification('При загрузке артистов произошла ошибка.')    
    });;
}

/**
 * Создаёт HTML элемент артиста
 * @param artist
 */
function makeArtistCard(artist: IArtist): Element {
    const artistCard = createElement('div', 'artists-list__artist-card');
    const artistAvatar = createElement('div', 'artists-list__avatar');
    const artistName = createElement('div', 'artists-list__artist-name');

    artistName.append(artist.name);
    artistCard.append(artistAvatar);
    artistCard.append(artistName);

    artistCard.addEventListener('click', () => {
        window?.open(artist.url, '_blank')?.focus();
    })

    return artistCard;
}

/**
 * Запрашивает и заполянет треки в контейнер track-list
 * @param app - базовый контейнер страницы
 */
function fillTracks(app: Element): Promise<void> {
    const trackList = app.getElementsByClassName('track-list')[0];

    return makeApiRequest('chart.gettoptracks').then((tracksJson) => {
        trackList.innerHTML = '';
        const tracks = tracksJson.tracks.track as Array<ITrack>; 

        tracks.slice(0, TRACKS_AMOUNT).forEach((track) => {
            trackList.append(makeTrack(track));
        });
    }).catch(() => {
        showNotification('При загрузке треков произошла ошибка.')    
    });;
}

/**
 * Создаёт HTML элемент трека
 * @param track
 */
function makeTrack(track: ITrack) {
    const trackContainer = createElement('div', 'track-list__track');
    const trackAvatar = createElement('div', 'track-list__avatar');
    const trackDescription = createElement('div', 'track-list__track_description');
    const trackName = createElement('div', 'track-list__track_name');
    trackName.append(track.name);

    const trackAuthor = createElement('div', 'track-list__track_author');
    trackAuthor.append(track.artist.name);
    trackAuthor.addEventListener('click', (event) => {
        window?.open(track.artist.url, '_blank')?.focus();
        event.stopPropagation();
    })

    trackDescription.append(trackName);
    trackDescription.append(trackAuthor);

    trackContainer.append(trackAvatar);
    trackContainer.append(trackDescription);

    trackContainer.addEventListener('click', () => {
        window?.open(track.url, '_blank')?.focus();
    })

    return trackContainer;
}
