// client id and redirect uri are stored in the environmental variables
const CLIENT_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID; 
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

let accessToken;

const Spotify = {
    authorize() {
        // if token has already been retrieved just return it
        if (accessToken) {
            return accessToken;
        }

        // otherwise check if we are currently in the uri with token information
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/); 
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        // if access token and expiration time is in the uri: save token
        if (accessTokenMatch && expiresInMatch){
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            // reset the uri to the root path so that we could grab the token next time
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
        else {
            // when no token is available and we are not yet in the uri with token
            // we have to go to this uri
            const authUri = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&scope=playlist-modify-private&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
            window.location = authUri;
        }
    },

    search(query){
        const token = this.authorize();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {return response.json();}).then(jsonContent => {
            if(!jsonContent.tracks)
                return [];
            return jsonContent.tracks.items.map(track => ({
                name: track.name, 
                id: track.id, 
                artist: track.artists.map(art => art.name).join(", "), 
                album: track.album.name,
                uri: track.uri,
                preview_url: track.preview_url
            }));
        });
    },

    savePlaylist(name, playlist){
        if (!name || playlist.length === 0)
            return;
        
        // get access token and prepare headers
        const token = this.authorize();
        const headers = {Authorization: `Bearer ${token}`};

        // get user id
        let userId;
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
            .then(response => response.json())
            .then(jsonResponse => {
                userId = jsonResponse.id;
                // create new palylist
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    headers: headers,
                    method: 'POST',
                    body: JSON.stringify({name: name, description: "Created with Jammming", public: false})
                })
                .then(response => response.json())
                .then(jsonResponse => {
                    const playlistId = jsonResponse.id;
                    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify(playlist.map(track => track.uri))
                    });
                });
            });
    }
}

export default Spotify;