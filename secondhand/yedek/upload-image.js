import axios from "axios";
import { useState } from "react";
import { getCroppedImage } from '../src/utils/cropImage.js';
import { dataURLtoFile } from '../src/utils/dataURltoFile.js';

function UploadImage(){
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);   

    const upload = async (e) => {
        const canvas = await getCroppedImage(image);
        const canvasDataUrl = canvas.toDataURL("image/jpeg");
        const convertedUrltoFile = dataURLtoFile(canvasDataUrl, "myimage.jpeg")
        console.log(convertedUrltoFile);

        const formData = new FormData();
        formData.append('myImage', convertedUrltoFile)

        axios.post('http://localhost:3080/file/uploadimage', formData, {withCredentials: true})
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getImages = () => {
        axios.get("http://localhost:3080/file/annonce?id=annonce1")
            .then(response => {
                console.log(response)
                setImages(response.data.images)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const onFileChange = event => {
        if(event.target.files && event.target.files.length > 0){
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load', () => {
                console.log(reader.result);
                setImage(reader.result);
            })
        }
    };

    
    return(
        <div>
            <div className="upload">
                <input className="form-control" accept="image/*" type="file" id="file" name="file"  onChange={onFileChange} style={{marginBottom: '10px'}}></input>
                <button type="button" className="btn btn-primary" onClick={upload}>Upload</button>
            </div>
            <hr/>
            <div className="show-images">
                <div>
                { images.length > 0 ?
                    images.map(element => {
                        return(
                            <img src={`http://localhost:3080/file/image?id=${element.Key}`} key={element.Key} width="250" height="250" alt="pic" style={{margin: 5}}/>
                        )
                    })
                    : 
                    null
                }
                </div>
                
                <button type="button" className="btn btn-primary mt-3" onClick={getImages}>Show images</button>
            </div>
        </div>
    )
}

export default UploadImage;

//http://localhost:3080/file?type=img&id=61a45dee1d898f49a3b1f2da
//encType="multipart/form-data" action="/file/uploadimage" method="POST" multiple="multiple"
