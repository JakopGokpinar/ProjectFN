import { useState } from "react";

function PhotoAndDescription() {
    const [doc, setDoc] = useState();

    const onFileChange = event => {
        console.log(event.target.files[0])
        const ImageUrl =  URL.createObjectURL(event.target.files[0]);
        setDoc(ImageUrl)
    };

    return(
        <div className="mb-5 mt-5">
            <form encType="multipart/form-data" action="/file/uploadimage" method="POST" >
                <h3>Bilder, Videoer og Beskrivelse</h3>
                <label className="form-label" for="image">Bilder</label> 
                <div  className="input-group mb-3">
                    <input className="form-control-file" type="file" id="file" name="files[]" multiple="multiple" onChange={onFileChange}></input>
                </div>
                <img src={doc} id="fdsa" alt="pic1" width="250" height="250" />
                <br/>
                <label className="form-label">Video</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="video"></input>
                </div>
                <label htmlFor="description" className="form-label">Beskrivelse</label>
                <div className="input-group mb-3">
                    <textarea className="form-control" id="description" rows="3"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PhotoAndDescription;