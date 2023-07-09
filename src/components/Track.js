import React, { useCallback } from "react";
import "../styles/Track.css";


function Track(props){
    const {onAction, track} = props;

    const onClick = useCallback((event) => {
        onAction(track);
    }, [onAction, track]);

    return (
        <li className="Track">
            <div className="songInfo">
                <h3>{track.name}</h3>
                <p>{track.album + " | " + track.artist}</p>
            </div>
            <button className="trackButton" onClick={onClick}>{props.button}</button>
        </li>
    )
}

export default Track;