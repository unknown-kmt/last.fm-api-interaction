import {handlePopularArtist, handleMostPlayableTrack, handleTopArtistTopTrack} from './main.js';
import {handleSearchFoundItem} from './search.js';

const API_KEY = "d4559cbd63cd42bba87704ff80275f4b";

const TopTrackLimit = 5; // максимум получаемых популярных треков
const TopArtistsLimit = 4; // максимум получаемых популярных исполнителей
const maxResultsInCategory = 10; // максимальное количество элементов для альбомов, артистов и трэков

/**
 * Получение самых популярных исполнителей
 * @returns {Promise} промис с запросом
 */
export async function fetchTopArtists() {
    return await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=${API_KEY}&limit=${TopArtistsLimit}&format=json`
    )
        .then((data) => data.json())
        .then((data) => data.artists)
        .then((artists) => {
            const artistsArr = artists.artist;

            for (let i = 0; i < artistsArr.length; i++) {
                handlePopularArtist(artistsArr[i], i + 1);
            }
        })
        .catch((error) => console.log(error));
}

/**
 * Получение самого популярного трека исполнителя
 * @param {String} artistMbid mbid исполнителя
 * @returns {Promise} промис с запросом 
 */
export async function fetchArtistTopTrack(artistMbid) {
    return await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=${API_KEY}&limit=1&mbid=${artistMbid}&format=json`
    )
        .then((data) => data.json())
        .then((data) => data.toptracks)
        .then((toptracks) => handleTopArtistTopTrack(toptracks.track[0]))
        .catch((error) => console.log(error));
}

/**
 * Получение самый прослушиваемых песен
 * @returns {Promise} промис с запросом  
 */
export async function fetchTopTracks() {
    return await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${API_KEY}&limit=${TopTrackLimit}&format=json`
    )
        .then((data) => data.json())
        .then((data) => data.tracks)
        .then((tracks) => tracks.track.forEach((track) => handleMostPlayableTrack(track)))
        .catch((err) => console.log(err));
}

/**
 * Получение песен по ключевой строке
 * @param {String} request запрос
 * @returns {Promise} промис с запросом 
 */
export async function fetchSearchTracks(request) {
    return await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${request}&api_key=${API_KEY}&limit=${maxResultsInCategory}&format=json`)
        .then((data) => data.json())
        .then((data) => data.results.trackmatches.track)
        .then((tracks) => tracks.forEach((track) => handleSearchFoundItem(track, "Песня")))
        .catch((error) => console.log(error));
}

/**
 * Получение альбомов по ключевой строке
 * @param {String} request запрос
 * @returns {Promise} промис с запросом 
 */
export async function fetchSearchAlbums(request) {
    return await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${request}&api_key=${API_KEY}&limit=${maxResultsInCategory}&format=json`)
        .then((data) => data.json())
        .then((data) => data.results.trackmatches.track)
        .then((albums) => albums.forEach((album) => handleSearchFoundItem(album, "Альбом")))
        .catch((error) => console.log(error));
}

/**
 * Получение исполнителей по ключевой строке
 * @param {String} request запрос 
 * @returns {Promise} промис с запросом 
 */
export async function fetchSearchArtists(request) {
    return await fetch(`http://ws.audioscrobbler.com/2.0/?method=track.search&track=${request}&api_key=${API_KEY}&limit=${maxResultsInCategory}&format=json`)
        .then((data) => data.json())
        .then((data) => data.results.trackmatches.track)
        .then((artists) => artists.forEach((artist) => handleSearchFoundItem(artist, "Исполнитель")))
        .catch((error) => console.log(error));
}