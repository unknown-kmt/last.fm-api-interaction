import { handlePopularArtist, handleMostPlayableTrack, handleTopArtistTopTrack } from './main.js';
import { handleSearchFoundItem } from './search.js';

const API_KEY = "d4559cbd63cd42bba87704ff80275f4b";

const TopTrackLimit = 5; // максимум получаемых популярных треков
const TopArtistsLimit = 4; // максимум получаемых популярных исполнителей
const maxResultsInCategory = 10; // максимальное количество элементов для альбомов, артистов и трэков


/**
 * 
 * @param {String} method предмет запроса к api
 * @param {Object} params дополнительные параметры запроса
 * @returns {Promise} запроса
 */
async function createAPIRequest(method, params) {
    let query = `https://ws.audioscrobbler.com/2.0/?method=${method}&api_key=${API_KEY}&format=json`;

    for (const [name, value] of Object.entries(params)) {
        query += `&${name}=${value}`;
    }

    return fetch(query).catch((error) => console.log(error));
}

/**
 * Получение самых популярных исполнителей
 * @returns {Promise} промис с запросом
 */
export async function fetchTopArtists() {
    return createAPIRequest("chart.gettopartists", { "limit": TopArtistsLimit })
        .then((data) => data.json())
        .then((data) => data.artists)
        .then((artists) => {
            const artistsArr = artists.artist;

            for (let i = 0; i < artistsArr.length; i++) {
                handlePopularArtist(artistsArr[i], i + 1);
            }
        })
}

/**
 * Получение самого популярного трека исполнителя
 * @param {String} artistMbid mbid исполнителя
 * @returns {Promise} промис с запросом 
 */
export async function fetchArtistTopTrack(artistMbid) {
    return createAPIRequest("artist.gettoptracks", { "limit": 1, "mbid": artistMbid })
        .then((data) => data.json())
        .then((data) => data.toptracks)
        .then((toptracks) => handleTopArtistTopTrack(toptracks.track[0]))
}

/**
 * Получение самый прослушиваемых песен
 * @returns {Promise} промис с запросом  
 */
export async function fetchTopTracks() {
    return createAPIRequest("chart.gettoptracks", { "limit": TopTrackLimit })
        .then((data) => data.json())
        .then((data) => data.tracks)
        .then((tracks) => tracks.track.forEach((track) => handleMostPlayableTrack(track)))
}

/**
 * Поиск по ключевой строке
 * @param {String} requestedString запрос
 * @returns {Promise} промис чьё выполнение сигнализирует о выполнении запросов
 */
export async function fetchSearch(requestedString) {
    return Promise.all([
        createAPIRequest("track.search", { "track": requestedString, "limit": maxResultsInCategory })
            .then((data) => data.json())
            .then((data) => data.results.trackmatches.track)
            .then((tracks) => tracks.forEach((track) => handleSearchFoundItem(track, "Песня"))),

        createAPIRequest("album.search", { "album": requestedString, "limit": maxResultsInCategory })
            .then((data) => data.json())
            .then((data) => data.results.albummatches.album)
            .then((albums) => albums.forEach((album) => handleSearchFoundItem(album, "Альбом"))),

        createAPIRequest("artist.search", { "artist": requestedString, "limit": maxResultsInCategory })
            .then((data) => data.json())
            .then((data) => data.results.artistmatches.artist)
            .then((artists) => artists.forEach((artist) => handleSearchFoundItem(artist, "Исполнитель")))
    ])
}