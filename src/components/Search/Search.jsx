import { useState } from 'react';
import search_icon from './search.png';
import { createAPIRequest } from '../../api';
import SearchItem from '../SearchItem/SearchItem';
import './search.css'

let foundItemsRoot = undefined;
let searchField = undefined;

const maxResultsInCategory = 10; // максимальное количество элементов для альбомов, артистов и трэков

export const Search = () => {
    const [foundItems, setFoundItems] = useState([]);

    /**
     * Очистка поиска
     */
    function clearSearch() {
        setFoundItems([]);
    }

    /**
    * Поиск по ключевой строке
    * @param {String} requestedString запрос
    * @returns {Promise} промис, чьё выполнение сигнализирует о выполнении запросов
    */
    async function search(requestedString) {
        const collector = [];
        const handler = function handleFoundItem(item, type) {
            collector.push({ "result": item, "type": type });
        };

        Promise.all([
            createAPIRequest("track.search", { "track": requestedString, "limit": maxResultsInCategory })
                .then((data) => data.results.trackmatches.track)
                .then((tracks) => tracks.forEach((track) => handler(track, "Песня"))),

            createAPIRequest("album.search", { "album": requestedString, "limit": maxResultsInCategory })
                .then((data) => data.results.albummatches.album)
                .then((albums) => albums.forEach((album) => handler(album, "Альбом"))),

            createAPIRequest("artist.search", { "artist": requestedString, "limit": maxResultsInCategory })
                .then((data) => data.results.artistmatches.artist)
                .then((artists) => artists.forEach((artist) => handler(artist, "Исполнитель")))
        ]).finally(() => {setFoundItems(collector)});
    }

    /**
     * Хэндлер нажатия энтера в строке поиска
     * @param {Event} event событие нажатия 
     */
    function searchButtonPressHandler(event) {
        if (event.key === "Enter")
            handleSearch()
    }

    /**
     * Обработчик поиска
     */
    function handleSearch() {
        foundItemsRoot = document.getElementById('found_items');
        searchField = document.getElementById('search_input');

        if (searchField.value !== "") {
            if (!foundItemsRoot.getAttribute("searchActive")) {
                foundItemsRoot.setAttribute("searchActive", "true");
                clearSearch();
                search(searchField.value).finally(() => {
                    foundItemsRoot.removeAttribute("searchActive");;
                });
            }
        }
    }

    return (
        <main className="content">
            <div className="mainContent">
                <div className="search__pane">
                    <div className="search__field">
                        <input id="search_input" className="search__input" type="text" name="song_name" placeholder="Название" onKeyDown={searchButtonPressHandler} />
                        <button id="search_button" className="search__button" onClick={handleSearch}>
                            <img src={search_icon} alt="поиск" height="16" width="16" />
                        </button>
                    </div>
                    <div id="found_items" className="search_item__list">
                        {foundItems.map((item) => {
                            return <SearchItem key={item.result.url} item={item}></SearchItem>;
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
};