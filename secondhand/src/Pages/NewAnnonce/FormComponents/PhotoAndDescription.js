import { useState } from "react";

function PhotoAndDescription() {
    const [doc, setDoc] = useState();
    const onFileChange = event => {
        const ImageUrl =  URL.createObjectURL(event.target.files[0]);
        // Update the state
        setDoc(ImageUrl)
      };

    return(
        <div className="mb-5 mt-5">
            <h3>Bilder, Videoer og Beskrivelse</h3>
            <label className="form-label">Bilder</label> 
            <div  className="input-group mb-3">
                <input type="file" id="photo" onChange={onFileChange}></input>
            </div>
            <img src={doc} id="fdsa" alt="pic1" width="250" height="250" />
            <label className="form-label">Video</label>
            <div className="input-group mb-3">
                <input type="text" className="form-control" id="video"></input>
            </div>
            <label htmlFor="description" className="form-label">Beskrivelse</label>
            <div className="input-group mb-3">
                <textarea className="form-control" id="description" rows="3"/>
            </div>
        </div>
    )
}

export default PhotoAndDescription;