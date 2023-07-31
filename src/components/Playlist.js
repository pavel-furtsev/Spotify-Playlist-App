import React, { useCallback } from "react";
import TrackList from './TrackList'
import "../styles/Playlist.css";

function Playlist(props){
    const {
        playlistName, 
        onNameChange, 
        tracks,
        onAction,
        onSave,
        onPlay,
        playing
    } = props;

    const handleNameChange = useCallback((event) => {
        onNameChange(event.target.value);
    }, [onNameChange]);

    return (
        <div className="Playlist">
            <input className="playlistName" value={playlistName} onChange={handleNameChange}/>
            <TrackList button="-" tracks={tracks} onAction={onAction} onPlay={onPlay} playing={playing}/>
            <button className="saveButton" onClick={onSave}>Save to spotify</button>
        </div>
    )
}

export default Playlist;