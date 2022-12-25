import { useEffect } from 'react';
import './content.css';

export const Main = (props) => {
    useEffect(() => {
        props.onLoad();
    }, [props]);

    return (
        <main className="content">
            <div className="mainContent">
                <h1>Популярные исполнители</h1>
                <div id="most_popular_artists" className="artists"></div>
                <div id="best_track_of_top_artist" className="best_track"></div>
                <div className="most_listened__header">Самые прослушиваемые сейчас</div>
                <div id="most_playable_songs" className="most_playable"></div>
            </div>
        </main>
    );
};