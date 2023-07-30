import React, { useCallback } from "react";
import "../styles/Track.css";


function Track(props){
    const {onAction, track, onPlay} = props;

    const onClick = useCallback((event) => {
        onAction(track);
    }, [onAction, track]);

    const onPlayButton = useCallback((event) => {
        onPlay(track);
    }, [track, onPlay]);

    return (
        <li className="Track">
            <div className="songInfo">
                <div className="songTitle">
                    <h3>{track.name}</h3>
                    <button className="playButton" onClick={onPlayButton}>▶</button>
                </div>
                <p>{track.album + " | " + track.artist}</p>
            </div>
            
            <button className="trackButton" onClick={onClick}>{props.button}</button>
        </li>
    )
}

export default Track;