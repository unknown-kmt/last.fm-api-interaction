export const SearchItem = (props) => {
    const item = props.item;

    return (<div className="search_item">
                <a href={item.result.url}>
                    {item.type} - {item.result.name}
                </a>
            </div>);
};

export default SearchItem;

