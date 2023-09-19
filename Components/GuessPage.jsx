import React from "react"

export default function GuessPage(props){
    const [songName, SetSongName] = React.useState("");

        const handleSubmit = (event) => {
          event.preventDefault();
          console.log(props.name)
          console.log(songName)
          if (songName == props.name){
            console.log("correct")
            props.updateAnswerCorrect(true)
          }
        }
    
      
    return(
        <>
        <div>
        <img className="h-80 w-80 mt-12"
         src="https://www.shareicon.net/data/512x512/2016/07/28/803169_box_512x512.png"></img>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <input className="mt-12 box-border h-10 w-72"
                    type="text" 
                    value={songName}
                    onChange={(e) => SetSongName(e.target.value)}/>
                <input className="box-border h-10 w-32" type="submit" />
            </form>
        </div>
        </>
    )
}