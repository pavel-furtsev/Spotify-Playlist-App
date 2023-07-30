import React, {useState, useCallback} from 'react';
import Spotify from "./util/Spotify";

import './App.css';

import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults';
import Player from './components/Player'; 

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [playbackTrack, setPlaybackTrack] = useState();

  const search = useCallback((query) => {
    Spotify.search(query).then(setSearchResults);
    setPlaybackTrack(null);
  }, []);

  const addTrack = useCallback((track) => {
    if(playlistTracks.some((saved) => saved.id === track.id))
      return;

    setPlaylistTracks((previouse) => [...previouse, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((previouse) => previouse.filter(t => t.id !== track.id));
  }, []);

  const savePlaylist = useCallback(() => {
    Spotify.savePlaylist(playlistName, playlistTracks).then(() => {
      setPlaylistName("New playlist");
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);

  const playPreview = useCallback((track) => {
    setPlaybackTrack(track);
  ;}, [])

  return (
    <>
      <header className="App-header">
        <h1>Ja<span className="heighlite">mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar onSearch={search}/>
        <div className="lists">
          <SearchResults 
            tracks={searchResults}
            playing={playbackTrack}
            onAction={addTrack}
            onPlay={playPreview}/>
          <Playlist 
            tracks={playlistTracks}
            playing={playbackTrack}
            playlistName={playlistName} 
            onNameChange={setPlaylistName}
            onAction={removeTrack}
            onSave={savePlaylist}
            onPlay={playPreview}/>
        </div>
        {
          playbackTrack ? 
          <Player track={playbackTrack}/> :
          <></>
        }
      </main>
    </>
  );
}

export default App;
