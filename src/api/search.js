import { fetchSearch } from './dataFetchers.js';

let foundItemsRoot = undefined;
let searchField = undefined;

/**
 * Хэндлер нажатия энтера в строке поиска
 * @param {Event} event событие нажатия 
 */
export function searchButtonPressHandler(event) {
    if (event.key === "Enter")
        handleSearch()
}

/**
 * Обработчик нового найденного по запросу элемента
 * @param {Object} item найденный элемент
 * @param {String} itemType Тип элемента
 */
function handleFoundItem(item, itemType) {
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
 */
export function handleSearch() {
    foundItemsRoot = document.getElementById('found_items');
    searchField = document.getElementById('search_input');

    if (searchField.value !== "") {
        if (!foundItemsRoot.getAttribute("searchActive")) {
            const foundItems = [];

            foundItemsRoot.setAttribute("searchActive", "true");
            foundItemsRoot.innerHTML = "";

            fetchSearch(searchField.value, foundItems).finally(() => {
                foundItemsRoot.removeAttribute("searchActive");
                foundItems.forEach((item) => handleFoundItem(item.content, item.description));
            });
        }
    }
}