import React from "react"

export default function Song(props){
    return(
        <div>
        <img className="h-80 w-80 mt-12"
         src={props.img}></img>
        <h1 className="text-center font-display bg-white text-2xl
       mt-12"> {props.name} </h1>
        <h3 className="text-center font-display bg-white text-xl mt-5"> {props.artists}</h3>
        </div>
    )
}