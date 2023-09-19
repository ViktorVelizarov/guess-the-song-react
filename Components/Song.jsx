import React from "react"

export default function Song(props){
    return(
        <div>
        <img className="h-80 w-80 mt-12"
         src={props.img}></img>
        <h1 className="text-center"> {props.name} </h1>
        <h3 className="text-center"> Artists:</h3>
        </div>
    )
}