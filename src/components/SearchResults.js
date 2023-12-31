import React from "react";
import TrackList from './TrackList';
import "../styles/SearchResults.css";

function SearchResults(props){
    
    const {tracks, onAction, onPlay, playing} = props;
    
    return (
        <div className="SearchResults">
            <h2 className="searchResultsTitle">Search results</h2>
            <TrackList 
                tracks={tracks}
                button="+" 
                onAction={onAction}
                onPlay={onPlay}
                playing={playing}/>
        </div>
    )
}

export default SearchResults;