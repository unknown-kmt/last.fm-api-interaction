import {fetchArtistTopTrack, fetchTopArtists, fetchTopTracks} from './dataFetchers.js';

const mostPlayableRoot = document.getElementById('most_playable_songs');
const artistTopTrackRoot = document.getElementById('best_track_of_top_artist');
const mostPopularArtistRoot = document.getElementById('most_popular_artists');

const imageIndex = 2; // индекс разрешений картинок, полученных из api. 1 = medium

window.onload = initPage;

/**
 * Функция инициализации страницы
 */
function initPage() {
    fetchTopArtists();
    fetchTopTracks();
}

/**
 * Обработчик нового популярного исполнителя
 * @param {Object} artist Исполнитель
 * @param {Number} position Порядковый номер
 */
export function handlePopularArtist(artist, position) {
    if (position == 1) {
        fetchArtistTopTrack(artist.mbid);
    }

    mostPopularArtistRoot.insertAdjacentHTML('beforeend',
        `<a class="artist__bubble" href="${artist.url}">
            <div>
                <span class="artist__info">
                    #${position} ${artist.name}
                </span>
                <img class="artist__image" src="${artist.image[imageIndex]["#text"]}">
            </div>
        </a>`
    );
}

/**
 * Обработчик новой найденной наиболее прослушиваемой песни
 * @param {Object} track песня
 */
export function handleMostPlayableTrack(track) {
    mostPlayableRoot.insertAdjacentHTML('beforeend',
        `<div class="most_playable_song">
            <a href="${track.url}">
                ${track.name} by ${track.artist.name}
            </a>
        </div>`
    );
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
