/**
 * Интерфейс артиста
 */
export interface IArtist {
    /**
     * Псевдоним
     */
    name: string,

    /**
     * Ссылка на Last.fm
     */
    url: string,

    /** 
     * Кол-во слушателей 
     */
    listeners: number
}

/**
 * Интерфейс трека
 */
export interface ITrack {
    /**
     * Название
     */
    name: string,
    
    /**
     * Исполнитель
     */
    artist: IArtist

    /**
     * Ссылка на Last.fm
     */
    url: string
}

/**
 * Интерфейс музыкального тега
 */
export interface ITag {
    /**
     * Имя
     */
    name: string

    /**
     * Ссылка на Last.fm
     */
    url: string
}

/**
 * Интерфейс музыкального альбома
 */
 export interface IAlbum {
    /**
     * Имя
     */
    name: string

    /**
     * Псевдоним исполнителя
     */
    artist: string

    /**
     * Ссылка на Last.fm
     */
    url: string
}

/**
 * Интерфейс треков при их поиске (метод поиска возвращает сильно урезанные данные).
 */
 export interface ISearchTrack {
    /**
     * Название
     */
    name: string,
    
    /**
     * Исполнитель
     */
    artist: string

    /**
     * Ссылка на Last.fm
     */
    url: string
}
