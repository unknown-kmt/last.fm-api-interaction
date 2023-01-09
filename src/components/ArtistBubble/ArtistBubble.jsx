const imageIndex = 2; // индекс размера картинка в массиве таковых получаемого объекта

export const ArtistBubble = (props) => {
    const artist = props.artist;

    return (<a className="artist__bubble" href={artist.url}>
                <div>
                    <span className="artist__info">
                        {artist.name}
                    </span>
                    <img alt={artist.name} className="artist__image" src={artist.image[imageIndex]["#text"]}></img>
                </div>
            </a>);
};

export default ArtistBubble;