import React from "react"

export default function GuessPage(){
    const [name, setName] = React.useState("");
      
        const handleSubmit = (event) => {
          event.preventDefault();
          alert(`The name you entered was: ${name}`);
        }
    
      
    return(
        <>
        <div>
        <img className="songPicture"
         src="https://www.shareicon.net/data/512x512/2016/07/28/803169_box_512x512.png"></img>
        </div>
        <div>
            <form onSubmit={handleSubmit}>
                <input className="form-input"
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}/>
                <input className="form-submit" type="submit" />
            </form>
        </div>
        </>
    )
}