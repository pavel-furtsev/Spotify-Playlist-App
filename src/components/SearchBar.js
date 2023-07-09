import React, {useState, useCallback} from "react";
import "../styles/SearchBar.css";

function SearchBar(props){

    const {onSearch} = props
    const [query, setQuery] = useState("");

    const handleQueryChange = useCallback((event) => {
        setQuery(event.target.value);
    }, []);

    const search = useCallback(() => {
        onSearch(query);
    }, [query, onSearch]);

    return (
        <div className="SearchBar">
            <input className="serachInput" type="text" placeholder="Search for a song" onChange={handleQueryChange}/>
            <button className="searchButton" onClick={search}>Search</button>
        </div>
    )
}

export default SearchBar;