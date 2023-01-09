import { useState, useEffect } from 'react';
import { createAPIRequest } from '../../api';

import ArtistBubble from '../ArtistBubble/ArtistBubble';
import TopTrack from '../TopTrack/TopTrack';

import './content.css';

const TopArtistsLimit = 4; // максимум получаемых популярных исполнителей
const TopTrackLimit = 5; // максимум получаемых популярных треков

export const Main = () => {
    const [topArtists, setTopArtists] = useState([]);
    const [topTracks, setTopTracks] = useState([]);

    const [loaded, setLoaded] = useState(false);

    /**
    * Получение самых популярных исполнителей
    */
    function getPupularArtists() {
        createAPIRequest("chart.gettopartists", { "limit": TopArtistsLimit })
            .then((data) => data.artists)
            .then((artists) => setTopArtists(artists.artist));
    };

    /**
     * Получение самый прослушиваемых песен
     */
    function getTopTracks() {
        createAPIRequest("chart.gettoptracks", { "limit": TopTrackLimit })
            .then((data) => data.tracks)
            .then((tracks) => setTopTracks(tracks.track));
    };

    useEffect(() => {
        if (loaded) return;

        getPupularArtists();
        getTopTracks();

        setLoaded(true);
    }, [loaded]);

    return (
        <main className="content">
            <div className="mainContent">
                <h1>Популярные исполнители</h1>
                <div id="most_popular_artists" className="artists">
                    {topArtists.map((item) => {
                        return <ArtistBubble key={item.url} artist={item}></ArtistBubble>;
                    })}
                </div>
                <div className="most_listened__header">Самые прослушиваемые сейчас</div>
                <div id="most_playable_songs" className="most_playable">
                    {topTracks.map((item) => {
                        return <TopTrack key={item.url} track={item}></TopTrack>;
                    })}
                </div>
            </div>
        </main>
    );
};

export default Main;