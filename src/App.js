import React, {useState, useCallback} from 'react';
import Spotify from "./util/Spotify";

import './App.css';

import Playlist from './components/Playlist';
import SearchBar from './components/SearchBar';
import SearchResults from './components/SearchResults'; 

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("New playlist");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((query) => {
    Spotify.search(query).then(setSearchResults);
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

  return (
    <>
      <header className="App-header">
        <h1>Ja<span className="heighlite">mmm</span>ing</h1>
      </header>
      <main>
        <SearchBar onSearch={search}/>
        <div className="lists">
          <SearchResults tracks={searchResults} onAction={addTrack}/>
          <Playlist 
            tracks={playlistTracks} 
            playlistName={playlistName} 
            onNameChange={setPlaylistName}
            onAction={removeTrack}
            onSave={savePlaylist}/>
        </div>
      </main>
    </>
  );
}

export default App;
