import React, { useEffect } from "react"

export default function App()
{
    const [token, SetToken] = React.useState("")
    const clientID = "3ba0d9e71d40432dad224aacbefec132"
    const clientSecret = "e5aed49d8f7549aa8168fc0ede9c0c9a"

    const [accessToken, setAccessToken] = React.useState("")
    useEffect(() => {
    //API Access Token
    var authParams = {
        method: 'POST',
        headers:  {'Content-Type': 'application/x-www-form-urlencoded'},
        body: 'grant_type=client_credentials&client_id=' + clientID + '&client_secret=' + clientSecret
    }
    fetch('https://accounts.spotify.com/api/token', authParams)
    .then(res => res.json())
    .then(data => setAccessToken(data.access_token))

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
    "user-library-read"
    ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    
    const getReturnedParamsFromSpotifyAuth = (hash) => {
        const stringAfterHashtag = hash.substring(1); //removes first letter
        const paramsInUrl = stringAfterHashtag.split("&"); //splits on every &
        const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
          console.log(currentValue);
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
    
          localStorage.clear();
    
          localStorage.setItem("accessToken", access_token);
          localStorage.setItem("tokenType", token_type);
          localStorage.setItem("expiresIn", expires_in);

        
        }
      });

        const handleLogin = () => {
            window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
        }
        
        function getUserTracks(oneUseToken){
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${oneUseToken}` }
          }
         
          fetch('https://api.spotify.com/v1/me/tracks?limit=50', authParams)
          .then(res => res.json())
          .then(data => console.log(data))
        }

        function getUserPlaylists(oneUseToken){
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${oneUseToken}` }
          }
         
          fetch('https://api.spotify.com/v1/me/playlists', authParams)
          .then(res => res.json())
          .then(data => console.log(data))
        }

        const getInfo = () => {
          let oneUseToken = ""
          if(localStorage.getItem("accessToken"))
          { 
            SetToken(localStorage.getItem("accessToken"))
            oneUseToken = localStorage.getItem("accessToken")
          }
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${oneUseToken}` }
          }
         
          fetch('https://api.spotify.com/v1/me', authParams)
          .then(res => res.json())
          .then(data => console.log(data))

          getUserTracks(oneUseToken)
          getUserPlaylists(oneUseToken)
        }

    return(
        <div>
            <h1>hi</h1>
            <button onClick={handleLogin}> Login</button>
            <button onClick={getInfo}> Get Info</button>
        </div>
    )
}



    
