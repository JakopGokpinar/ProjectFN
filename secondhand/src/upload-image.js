import axios from "axios";
import { useEffect, useState } from "react";

function UploadImage(){

    const [doc, setDoc] = useState();


    const upload = (e) => {
        e.preventDefault();

        const data = new FormData() 

        data.append('file', doc)

        console.warn(doc);

        let url = "http://localhost:3080/file/uploadimage";


        axios.post(url, data, { // receive two parameter endpoint url ,form data 

        })

        .then(res => { // then print response status

            console.warn(res);

        })


    }

    const getImage = () => {
        axios.get("http://localhost:3080/file?type=img&id=61a45dee1d898f49a3b1f2da")
            .then()
    }

    const onFileChange = event => {
        console.log(event.target.files[0])
        setDoc(event.target.files[0])
    };
//encType="multipart/form-data" action="/file/uploadimage" method="POST"
    return(
        <div>
            <div className="upload">
                <form onSubmit={upload}>
                    <div className="input-group mb-3">
                        <input className="form-control-file" className="form-control" type="file" id="file" name="file" multiple="multiple" onChange={onFileChange}></input>
                    </div>
                    <button type="submit" className="btn btn-primary">submit</button>
                </form>
            </div>
            <hr/>
            <div className="show-images">
                <div>
                    <img src="http://localhost:3080/file?type=img&id=61a45dee1d898f49a3b1f2da" width="250" height="250" alt="pic"/>
                </div>
                <button type="button" className="btn btn-primary mt-3" onClick={getImage}>Show image</button>
            </div>
        </div>
    )
}

export default UploadImage;