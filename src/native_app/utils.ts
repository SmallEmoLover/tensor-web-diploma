// API-ключ Last.fm
const API_KEY = 'c970a604981f7696172a747986336149';

// Длительность уведомления
const NOTIFICATION_DURATION = 7000;

/* Идентификатор для генерации картинок. 
   Нужен здесь, чтобы в разных модулях генерировать разные картинки */  
let generatorId = 0;

/**
 * Обратиться к API Last.fm
 * @param method - имя метода для обращения 
 * @param params - словарь параметров запроса
 * @returns - промис выполнения
 */
export async function makeApiRequest(method: string, params: any = {}): Promise<any> {
    let urlParams = '';
    Object.keys(params).forEach((key) => {
        urlParams += `&${key}=${params[key]}`;
    })

    const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=${method}${urlParams}&api_key=${API_KEY}&format=json`
    );
    
    if (response.status !== 200) {
        throw new Error('Не можем связаться с сервером. Проверьте своё интернет соединение');
    }

    return await response.json();
}

/**
 * Создать новый элемент с заданными тегом/классом 
 * @param tag 
 * @param className 
 * @returns HTML-элемент
 */
export function createElement(tag: string, className: string = ""): Element {
    const element = document.createElement(tag);
    element.className = className;

    return element;
}

/**
 * Получает массив элементов по классу и конвертирует в нормальный человеческий
 * @param {string} className - имя класса 
 */
export function getItterableArrayByClassName(className: string): Array<HTMLElement> {
    return Array.from(
        document.getElementsByClassName(className)
    ) as Array<HTMLElement>;
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

/**
 * Показывает уведомление справа внизу экрана.
 * @param message - сообщение уведомления
 */
export function showNotification(message: string) {
    const container = document.getElementsByClassName('notifications')[0];
    const notification = createElement('div', 'notifications__notification');

    notification.append(message);

    container.append(notification);

    setTimeout(() => {
        container.removeChild(notification);
    }, NOTIFICATION_DURATION)
}
