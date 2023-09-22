import React, { useEffect } from "react"
import Song from "./Components/Song"
import GuessPage from "./Components/GuessPage"
import Timer from "./Components/Timer"
import Navbar from "./Components/Navbar"
import MainPage from "./Components/MainPage"
export default function App()
{
    const [token, SetToken] = React.useState("")
    const [loggedIn, SetLoggedIn] = React.useState(false)
    const [showText, SetShowText] = React.useState(false);
    const [showGuessPage, SetGuessPage] = React.useState(false);
    const [showSong, SetShowSong] = React.useState(false);
    const [currentSong, SetCurrentSong] = React.useState({});
    const [answerCorrect, SetAnswerCorrect] = React.useState(false); 
    const [currentAudio, SetCurrentAudio] = React.useState("")
    const [profilePicture, SetProfilePicture] = React.useState("")
    const [timer, setTimer] = React.useState(15)
    const [timeRanOut, setTimeRanOut] = React.useState(false)
    const updateAnswerCorrect = (newState) => {
      SetAnswerCorrect(newState);
    };
    const updateTimer = (newState) => {
      setTimer(newState);
    };


    useEffect(() => {
      if (answerCorrect){
        setTimeRanOut(true)
      }
    }, [answerCorrect]);

    useEffect(() => {
      if (timer === 1 && !timeRanOut) {
        currentAudio.pause();
        setTimeRanOut(true);
        SetAnswerCorrect(true)
      }
    }, [timer, timeRanOut]);
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
    const REDIRECT_URL_AFTER_LOGIN = "https://sweet-sunburst-e39bd9.netlify.app";
    const SPACE_DELIMITER = "%20";
    const SCOPES = [
    "user-read-email",
    "user-read-private",
    "user-read-currently-playing",
    "user-read-playback-state",
    "playlist-read-private",
    "playlist-read-collaborative",
    "user-library-read",
    "user-library-modify",
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

      //every time the currentSong state changes, we play that song so the user can guess it
      useEffect(() => {
        if (currentAudio) { //stop the previous song so they dont overlap
          currentAudio.pause();
        }
        const newAudio = new Audio(currentSong.songPreviw);
        newAudio.play();
        SetCurrentAudio(newAudio);
      }, [currentSong])

      useEffect(() => {
        if (window.location.hash) {
          const { access_token, expires_in, token_type } =
            getReturnedParamsFromSpotifyAuth(window.location.hash);
          SetToken(access_token)
          SetLoggedIn(true)
          getUserProfileInfo();
        }
      })

        function handleLogin(){
            window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${clientID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;
            SetShowText(false)
          }
        
        function getUserProfileInfo(){
          var authParams = {

            method: "GET",
            headers: { Authorization: `Bearer ${token}` }
          }
         
          fetch('https://api.spotify.com/v1/me', authParams)
          .then(res => res.json())
          .then(data => SetProfilePicture(data.images[1]))
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

        const getInfo = async () => {
          console.log(profilePicture)
          if (loggedIn == false) {
            SetShowText(true)
          } else {
            SetGuessPage(true);
            const randomIndex = Math.floor(Math.random() * (49 - 0 + 1)) + 0
            getRandomTrack()
              .then(data => {
                console.log(data.items[randomIndex])
                const song = data.items[randomIndex]
                SetCurrentSong({songName: song.track.name, 
                songPicture: song.track.album.images[0].url,
                songUri: song.track.uri,
                songPreviw: song.track.preview_url,
                songArtists: song.track.artists[0].name}) })
            getUserPlaylists();
            SetShowSong(true);
            console.log(currentSong);
            SetAnswerCorrect(false);
            setTimer(15)
            setTimeRanOut(false)
            } 
        };
      
    return(
        <>
        <Navbar loggedIn={loggedIn}
         handleLogin={handleLogin}
         url = {profilePicture.url}/>     
        <main className="flex flex-col items-center">     
              
        <MainPage showGuessPage={showGuessPage}
        showText={showText}
        getInfo={getInfo}/>   

              {showGuessPage && !timeRanOut ? <h3 className="font-display  text-2xl
               bg-blue-400 py-4 px-16 rounded-xl mt-6 "><Timer updateTimer={updateTimer} /></h3>: null}
                
              {timeRanOut &&
                  <button className="font-display  text-2xl bg-blue-400 py-4 px-16
                  rounded-xl mt-6 border-red-800 cursor-pointer hover:text-white"
                  onClick={getInfo}> Try Again</button>}

              {showGuessPage && (
                <>
                  {!answerCorrect &&
                     <GuessPage
                      name={currentSong.songName}
                      answerCorrect={answerCorrect}
                      updateAnswerCorrect={updateAnswerCorrect}
                    />
                  }
                  
                  {answerCorrect &&
                    <Song name = {currentSong.songName} 
                    img= {currentSong.songPicture}
                    artists={currentSong.songArtists}/>
                   }
            </>
                )}   
                <div className="absolute bottom-0 right-0 m-3"><img className="h-10 w-10"
                 src="Images/CreatorLogo.png"></img></div>   
        </main>
        </>
    )
}