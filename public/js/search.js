import {fetchSearchTracks, fetchSearchArtists, fetchSearchAlbums} from './dataFetchers.js';

const foundItemsRoot = document.getElementById('found_items');

window.onload = bindSearchFields;

/**
 * Биндинг элементов страницы поиска
 */
function bindSearchFields() {
    const button = document.getElementById('search_button');
    const field = document.getElementById('search_input');

    button.addEventListener('click', () => {
        if (field.value != "")
            handleSearch(field.value);
    });

    field.addEventListener('keydown', (event) => {
        if (field.value != "")
            if (event.key === "Enter")
                handleSearch(field.value);
    })
}

/**
 * Обработчик нового найденного по запросу элемента
 * @param {Object} item найденный элемент
 * @param {String} itemType Тип элемента
 */
export function handleSearchFoundItem(item, itemType) {
    foundItemsRoot.insertAdjacentHTML('beforeend',
        `<div class="search_item">
            <a href="${item.url}">
                ${itemType} - ${item.name}
            </a>
        </div>`
    );
}

/**
 * Обработчик поиска
 * @param {String} request запрос
 */
async function handleSearch(request) {
    fetchSearchTracks(request);
    fetchSearchArtists(request);
    fetchSearchAlbums(request);

    foundItemsRoot.innerHTML = "";
}