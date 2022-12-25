import { fetchArtistTopTrack, fetchTopArtists, fetchTopTracks } from './dataFetchers.js';

let mostPlayableRoot = undefined;
let artistTopTrackRoot = undefined;
let mostPopularArtistRoot = undefined;

let imageIndex = undefined; // индекс разрешений картинок, полученных из api.

/**
 * Функция инициализации страницы
 */
export function initPage() {
    mostPlayableRoot = document.getElementById('most_playable_songs');
    artistTopTrackRoot = document.getElementById('best_track_of_top_artist');
    mostPopularArtistRoot = document.getElementById('most_popular_artists');
    imageIndex = 2;

    const topArtists = [];
    const topTracks = [];
    const topArtistTopTrack = [];

    Promise.all([
        fetchTopArtists(topArtists),
        fetchTopTracks(topTracks)
    ])
        .finally(() => {
            fetchArtistTopTrack(topArtists[0].mbid, topArtistTopTrack)
                .finally(() => {
                    handleMostPlayableTracks(topTracks);
                    handlePopularArtists(topArtists);
                    handleTopArtistTopTrack(topArtistTopTrack[0]);
                })
        });
}

/**
 * Обработчик нового популярного исполнителя
 * @param {Array} artists Исполнители
 */
export function handlePopularArtists(artists) {
    for (let i = 0; i < artists.length; i++) {
        const artist = artists[i];

        mostPopularArtistRoot.insertAdjacentHTML('beforeend',
            `<a class="artist__bubble" href="${artist.url}">
                <div>
                    <span class="artist__info">
                        #${i + 1} ${artist.name}
                    </span>
                    <img class="artist__image" src="${artist.image[imageIndex]["#text"]}">
                </div>
            </a>`
        );
    }
}

/**
 * Обработчик новой найденной наиболее прослушиваемой песни
 * @param {Object} tracks песни
 */
export function handleMostPlayableTracks(tracks) {
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];

        mostPlayableRoot.insertAdjacentHTML('beforeend',
            `<div class="most_playable_song">
            <a href="${track.url}">
                ${track.name} by ${track.artist.name}
            </a>
        </div>`
        );
    }
}

/**
 * Обработчик найденной самой популярной песни исполнителя на 1 позиции
 * @param {Object} track 
 */
export function handleTopArtistTopTrack(track) {
    artistTopTrackRoot.insertAdjacentHTML('beforeend',
        `<span class="name">
            <a href="${track.url}">
                ${track.name}
            </a>
        </span>
        <span class="plays">
            Проигрываний: ${track.playcount}
        </span>`
    );
}
