// Ключ для Last.fm API
const API_KEY = 'c970a604981f7696172a747986336149';

/* Идентификатор для генерации картинок. 
   Нужен здесь, чтобы в разных модулях генерировать разные картинки */  
let generatorId = 0;

/**
 * Через Last.fm API запрашивает заданный метод, преобразует полученные данные в объект
 */
export async function makeApiRequest<T>(method: string, params: Record<string, string | number>): Promise<T> {
    let urlParams = '';
    Object.keys(params).forEach((key) => {
        urlParams += `&${key}=${params[key]}`;
    })

    return fetch(
        `http://ws.audioscrobbler.com/2.0/?method=${method}${urlParams}&api_key=${API_KEY}&format=json`
    ).then((response) => response.json());
}


/**
 * Открывает ссылку в новом окне
 */
export function openNewTab(url: string) {
    window.open(url, '_blank');
}

/**
 * Возвращает ссылку на случайное изображение заданного формата.
 * Если не задавать высоту, то сгенерирует квадратное.
 * @param width 
 * @param height 
 */
 export function generateImageUrl(width: number, height?: number) {
    if (height === undefined) {
        height = width;
    }

    return `https://picsum.photos/${width}/${height}?random=${generatorId++}`
}