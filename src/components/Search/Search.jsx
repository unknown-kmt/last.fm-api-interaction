import search_icon from './search.png';
import { handleSearch, searchButtonPressHandler } from '../../api/search';
import './search.css'

export const Search = () => {
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
                    <div id="found_items" className="search_item__list"></div>
                </div>
            </div>
        </main>
    );
};