import React from "react"

export default function Song(props){
    return(
        <div>
        <img className="songPicture"
         src={props.img}></img>
        <h1 className="songTitle"> {props.name} </h1>
        <h3 className="songArtists"> Artists:</h3>
        </div>
    )
}