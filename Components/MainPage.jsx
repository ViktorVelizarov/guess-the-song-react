import React from "react"

export default function MainPage({showGuessPage, getInfo , showText}){
    return(
        <>
        {!showGuessPage && <> <div className="flex gap-24 mt-8"><img className="opacity-30 w-10 h-10" src="Images/ReactLogo.png"></img>
              <img className="opacity-30 w-10 h-10" src="Images/SpotifyLogo.png"></img></div>
                <h1 className="text-white mt-6"> This project was made with React and SpotifyAPI. 
                </h1>
                <div className="mt-10 p-8 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                "> <h1 className="text-center mb-5 text-white text-4xl font-display">How to play:</h1>
                <ul className="text-white text-lg">
                  <li>1. Click the Login button and login with your spotify account</li>
                  <li>2. Click the Start button</li>
                  <li>3. You have 15 seconds to guess the random song</li>
                  <li>4. Type the name of the song in the input field below</li>
                  <li>5. Click the Submit button</li></ul></div>
                  
                  <button className="font-display  text-2xl bg-blue-400 py-4 px-16
               rounded-xl mt-6 border-red-800 cursor-pointer hover:text-white"
                onClick={getInfo}> Start</button></>}
              {showText && <h2 className="text-white"> Please login first! </h2>}
        </>
    )
}