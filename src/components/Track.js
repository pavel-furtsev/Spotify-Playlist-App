import React, { useCallback } from "react";
import "../styles/Track.css";


function Track(props){
    const {onAction, track, onPlay, playing} = props;

    const onClick = useCallback((event) => {
        onAction(track);
    }, [onAction, track]);

    const onPlayButton = useCallback((event) => {
        onPlay(track);
    }, [track, onPlay]);

    return (
        <li className="Track" id={playing !== null && playing.id === track.id ? "playing" : "notPlaying"}>
            <div className="songInfo">
                <div className="songTitle">
                    <h3><a className="trackLink" href={track.uri}>{track.name}</a></h3>
                    <button className="playButton" onClick={onPlayButton}>▶</button>
                </div>
                <p>{track.album + " | " + track.artist}</p>
            </div>
            
            <button className="trackButton" onClick={onClick}>{props.button}</button>
        </li>
    )
}

export default Track;