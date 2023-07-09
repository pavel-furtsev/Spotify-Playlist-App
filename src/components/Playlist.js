import React, { useCallback } from "react";
import TrackList from './TrackList'
import "../styles/Playlist.css";

function Playlist(props){
    const {
        playlistName, 
        onNameChange, 
        tracks,
        onAction,
        onSave
    } = props;

    const handleNameChange = useCallback((event) => {
        onNameChange(event.target.value);
    }, [onNameChange]);

    return (
        <div className="Playlist">
            <input className="playlistName" value={playlistName} onChange={handleNameChange}/>
            <TrackList button="-" tracks={tracks} onAction={onAction}/>
            <button className="saveButton" onClick={onSave}>Save to spotify</button>
        </div>
    )
}

export default Playlist;