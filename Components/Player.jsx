import React from "react"
import SpotifyPlayer from "react-spotify-web-playback"
export default function Player(props){
    if (!props.token) return null
    return ( 
        <SpotifyPlayer
        token={props.token}
        showSaveIcon
        uris={props.trackUri ? [props.trackUri] : []}/>
    )
}