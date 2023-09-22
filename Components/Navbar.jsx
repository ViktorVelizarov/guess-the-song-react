import React from "react"

export default function Navbar(props){

    return( 
        <div className="p-4 border-black flex
              flex-row justify-between
              bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              <h1 className="font-display text-5xl">Guess The Song</h1> 
              {!props.loggedIn && <button className=" font-display  text-2xl bg-green-300 py-4 px-16
               rounded-xl border-red-800 cursor-pointer hover:text-white"
               onClick={props.handleLogin}> Login</button>}

              {props.loggedIn && <div className="flex flex-row"><h3 className="font-display 
               text-xl mr-3 mt-2 text-center">Logged in as: </h3>
               <img src={props.url} width="50px" height="100px"></img></div>}
        </div>
    )
}