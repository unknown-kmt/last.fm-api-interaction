export const TopTrack = (props) => {
    const track = props.track;

    return (<div className="most_playable_song">
                <a href={track.url}>
                    {track.name} by {track.artist.name}
                </a>
            </div>);
};

export default TopTrack;