import React from "react";
import Track from './Track';
import "../styles/TrackList.css";

function TrackList(props){

    const {tracks, onPlay, playing} = props;

    return (
        <ul className="TrackList">
            {tracks.map(track => 
                <Track 
                    track={track} 
                    button={props.button} 
                    key={track.id} 
                    onAction={props.onAction} 
                    onPlay={onPlay}
                    playing={playing}/>
            )}
        </ul>
    )
}

export default TrackList;