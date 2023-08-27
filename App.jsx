import React, { useEffect } from "react"

export default function App()
{
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
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);
    
    
        const handleLogin = () => {
            window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
        }
        

    return(
        <div>
            <h1>hi</h1>
            <button onClick={handleLogin}> Login</button>
        </div>
    )
}



    
