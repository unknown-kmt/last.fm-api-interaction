import { fetchSearch } from './dataFetchers.js';

const foundItemsRoot = document.getElementById('found_items');
const searchButton = document.getElementById('search_button');
const searchField = document.getElementById('search_input');

window.onload = bindSearchFields;

/**
 * Биндинг элементов страницы поиска
 */
function bindSearchFields() {
    searchButton.addEventListener('click', handleSearch);
    searchField.addEventListener('keydown', onSearchButtonPressHandler)
}

/**
 * Хэндлер нажатия энтера в строке поиска
 * @param {Event} event событие нажатия 
 */
function onSearchButtonPressHandler(event) {
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
function handleSearch() {
    if (searchField.value != "") {
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