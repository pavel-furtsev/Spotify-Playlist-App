import React, {useEffect} from "react";
import "../styles/Player.css";

function Player(props) {
    const {track} = props;

    useEffect(() => {
        var players = document.getElementsByClassName("audioPlayer");
        console.log(players);
        var player = players[0];
        player.play();
    }, [track]);

    return (
        <>
            <i class="fa fa-spotify"></i>
            <audio className="audioPlayer" 
                key={track.id} 
                controls="controls"
                src={track.preview_url} 
                type="audio/mpeg">
                Preview not available, or your brouser does not support audio.
            </audio>
        </>
    )
}

export default Player;