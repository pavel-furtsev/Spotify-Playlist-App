import React, {useEffect} from "react";
import "../styles/Player.css";
import spotify_icon from "../icons/spotify.svg";

function Player(props) {
    const {track} = props;

    useEffect(() => {
        // autoplay track
        var players = document.getElementsByClassName("audioPlayer");
        var player = players[0];
        var playPromise = player.play();
        
        if (playPromise !== undefined) {
            playPromise.then(_ => {
              // Automatic playback started!
              
            })
            .catch(error => {
              // Auto-play was prevented
            });
          }


    }, [track]);

    return (
        <div className="playerContainer">
            <img src={spotify_icon} alt="Spotify icon"/>
            <audio className="audioPlayer"
                key={track.id} 
                controls="controls"
                src={track.preview_url} 
                type="audio/mpeg">
                Preview not available, or your brouser does not support audio.
            </audio>
        </div>
    )
}

export default Player;