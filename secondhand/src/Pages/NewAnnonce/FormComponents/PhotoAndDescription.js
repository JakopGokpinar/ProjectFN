import { useState } from "react";
import axios from "axios";
import { getCroppedImage } from "../../../utils/cropImage";
import { dataURLtoFile } from "../../../utils/dataURltoFile";

function PhotoAndDescription() {
    const [image, setImage] = useState();
    const [images, setImages] = useState();

    const onFileChange = event => {
        if(event.target.files && event.target.files.length > 0){
            const reader = new FileReader();
            reader.readAsDataURL(event.target.files[0]);
            reader.addEventListener('load', () => {
                console.log(reader.result);
                setImage(reader.result);
            })
        } else {
            console.log("select a file")
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        var fileLocation = '';

        const canvas = await getCroppedImage(image);
        const canvasDataUrl = canvas.toDataURL("image/jpeg");
        const convertedUrltoFile = dataURLtoFile(canvasDataUrl, "myimage.jpeg")
        console.log(convertedUrltoFile);

        const formData = new FormData();
        formData.append('myImage', convertedUrltoFile)

        await axios.post('http://localhost:3080/file/uploadimage?location=ahmet/annonces/annonce1', formData, {withCredentials: true})
            .then(response => {
                console.log(response.data);
                fileLocation = response.data.data;
                console.log("file location: " + fileLocation)
            })
            .catch(err => {
                return console.log(err)
            })
        await axios.post('http://localhost:3080/user/newannonce',{fileLocation})
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                return console.log(err)
            })
    }

    const multipleFileChange = event => {
        if(event.target.files && event.target.files.length > 0){
            var imgArr = [];
            for (var i = 0; i < event.target.files.length; i++){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.addEventListener('load', () => {
                    imgArr.push(reader.result);
                    console.log(reader.result);
                })
            }
            setImages(imgArr)
        }
    };

    const uploadMultipleImage = async () => {
        var formData = new FormData();
        let selectedFiles = images;

        if ( selectedFiles ) {
            for ( let i = 0; i < selectedFiles.length; i++ ) {
                var img = selectedFiles[i];
                const canvas = await getCroppedImage(img);
                const canvasDataUrl = canvas.toDataURL("image/jpeg");
                const convertedUrltoFile = dataURLtoFile(canvasDataUrl, `${Date.now()}-myimage.jpg`);
                console.log(convertedUrltoFile);
                
                formData.append('galleryImage', convertedUrltoFile)
            }
            axios.post( 'http://localhost:3080/file/uploadimages?location=ahmet/annonces/annonce1', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return(
        <div className="mb-5 mt-5">
            <form encType="multipart/form-data" onSubmit={submit}>
                <h3>Bilder, Videoer og Beskrivelse</h3>
                <label className="form-label" htmlFor="image">Bilder</label> 
                <div  className="input-group mb-3">
                    <input className="form-control" accept="image/*" type="file" id="file" name="file" onChange={onFileChange}></input>
                </div>
                <label className="form-label" htmlFor="image">Multiple Bilder</label> 
                <div  className="input-group mb-3">
                    <input className="form-control" accept="image/*" type="file" id="file" name="files" multiple onChange={multipleFileChange}></input>
                </div>
                <img src={image} id="fdsa" alt="pic1" width="250" multiple="multiple" height="250" />
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
                <button type="button" className="btn btn-primary" onClick={uploadMultipleImage}>Upload Multiple</button>
            </form>
        </div>
    )
}

export default PhotoAndDescription;