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

    return fetch(query)
            .then((data) => data.json())
            .catch((error) => console.log(error));
}

/**
 * Получение самых популярных исполнителей
 * @param {Array} artistsCollector массив, куда будут записаны полученные исполнители
 * @returns {Promise} промис, чьё выполнение сигнализирует о выполнении запроса
 */
export async function fetchTopArtists(artistsCollector) {
    return createAPIRequest("chart.gettopartists", { "limit": TopArtistsLimit })
        .then((data) => data.artists)
        .then((artists) => {
            artistsCollector.push(...artists.artist)
        })
}

/**
 * Получение самого популярного трека исполнителя
 * @param {String} artistMbid mbid исполнителя
 * @param {Array} trackCollector массив, куда будут записаны полученый трек исполнителя
 * @returns {Promise} промис, чьё выполнение сигнализирует о выполнении запроса
 */
export async function fetchArtistTopTrack(artistMbid, trackCollector) {
    return createAPIRequest("artist.gettoptracks", { "limit": 1, "mbid": artistMbid })
        .then((data) => data.toptracks)
        .then((toptracks) => {trackCollector.push(toptracks.track[0])})
}

/**
 * Получение самый прослушиваемых песен
 * @param {Array} trackCollector массив, куда будут записаны полученные треки
 * @returns {Promise} список самый прослушиваемых песен
 */
export async function fetchTopTracks(trackCollector) {
    return createAPIRequest("chart.gettoptracks", { "limit": TopTrackLimit })
        .then((data) => data.tracks)
        .then((tracks) => tracks.track.forEach((track) => trackCollector.push(track)));
}

/**
 * Поиск по ключевой строке
 * @param {String} requestedString запрос
 * @param {Array} resultCollector массив результатов
 * @returns {Promise} промис, чьё выполнение сигнализирует о выполнении запросов
 */
export async function fetchSearch(requestedString, resultCollector) {
    const handler = function handleFoundItem(item, description) {
        resultCollector.push({"content": item, "description": description});
    };

    return Promise.all([
        createAPIRequest("track.search", { "track": requestedString, "limit": maxResultsInCategory })
            .then((data) => data.results.trackmatches.track)
            .then((tracks) => tracks.forEach((track) => handler(track, "Песня"))),

        createAPIRequest("album.search", { "album": requestedString, "limit": maxResultsInCategory })
            .then((data) => data.results.albummatches.album)
            .then((albums) => albums.forEach((album) => handler(album, "Альбом"))),

        createAPIRequest("artist.search", { "artist": requestedString, "limit": maxResultsInCategory })
            .then((data) => data.results.artistmatches.artist)
            .then((artists) => artists.forEach((artist) => handler(artist, "Исполнитель")))
    ])
}