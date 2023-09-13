import React, { useEffect } from "react"
import Song from "./Components/Song"
import Player from "./Components/Player";
export default function App()
{
    const [token, SetToken] = React.useState("")
    const [showSong, SetShowSong] = React.useState(false);
    const [currentSong, SetCurrentSong] = React.useState({});
    const clientID = "3ba0d9e71d40432dad224aacbefec132"
    const clientSecret = "e5aed49d8f7549aa8168fc0ede9c0c9a"
    useEffect(() => {
    //API Access Token
    var authParams = {
        method: 'POST',
        headers:  {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(res => res.json())
    .then(data => SetToken(data.access_token))

    }, [])

    const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
    const REDIRECT_URL_AFTER_LOGIN = "http://localhost:5173/";
    const SPACE_DELIMITER = "%20";
    const SCOPES = [
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "streaming",
    "user-modify-playback-state"
    ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    
    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1); //removes first letter
        const paramsInUrl = stringAfterHashtag.split("&"); //splits on every &
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
          const [key, value] = currentValue.split("=");
          accumulater[key] = value;
          return accumulater;
        }, {});
      
        return paramsSplitUp;
      };

      useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
          SetToken(access_token)
        }
      });

        const handleLogin = () => {
            window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
        }
        
        function getUserProfileInfo(){
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          }
         
          fetch('https://api.spotify.com/v1/me', authParams)
          .then(res => res.json())
          .then(data => console.log(data))
        }

        function getRandomTrack(){
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          }
         
          return fetch('https://api.spotify.com/v1/me/tracks?limit=50', authParams)
          .then(res => res.json())
          
        }

        function getUserPlaylists(){
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          }
         
          fetch('https://api.spotify.com/v1/users/smedjan/playlists?limit=50', authParams)
          .then(res => res.json())
          .then(data => console.log(data))
        }

        const getInfo = () => {
          const randomIndex = Math.floor(Math.random() * (49 - 0 + 1)) + 0
          getRandomTrack()
            .then(data => {
            console.log(data.items[randomIndex])
            const song = data.items[randomIndex]
            SetCurrentSong({songName: song.track.name
              , songPicture: song.track.album.images[0].url,
            songPreview: song.track.preview_url,
          songArtists: song.track.artists}) })
            
          getUserProfileInfo()
          getUserPlaylists()

          SetShowSong(true);
          console.log(currentSong)
        }

    return(
        <main>
            <h1>Guess The Song</h1>
              <div className="buttonContainer">
                <button className="loginButton" onClick={handleLogin}> Login</button>
                <button className="infoButton" onClick={getInfo}> Get Song</button>
              </div>
              {showSong && <Song name = {currentSong.songName}
               img= {currentSong.songPicture}/>}

               <Player token={token}/>
        </main>
    )
}



    
