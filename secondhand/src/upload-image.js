import axios from "axios";
import { useState } from "react";

function UploadImage(){

    const createImage = async (url) =>
        new Promise((resolve, reject) => {
            var newImage = new Image();
            newImage.addEventListener("load", () => resolve(newImage));
            newImage.addEventListener("error", (error) => reject(error));
            newImage.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
            newImage.src = url;
        });

    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);

    const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
    
        while (n--) u8arr[n] = bstr.charCodeAt(n);
    
        return new File([u8arr], filename, { type: mime });
    };

    const getCroppedImage = async (imageSrc) => {
        const myImage = await createImage(imageSrc);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = myImage.width;
        canvas.height = myImage.height;

        // draw rotated image and store data.
        ctx.drawImage(
            myImage,
            0, 0, myImage.width, myImage.height
        );

        const data = ctx.getImageData(0, 0, 100,100);

        // paste generated rotate image with correct offsets for x,y crop values.
        ctx.putImageData(
            data, 150, 0, 0, 0, 0, 0
        );

        // As Base64 string
        // return canvas.toDataURL("image/jpeg");
        return canvas;
    }

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
                setImages(response.data.images);
                console.log(images)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getImages = () => {
        axios.get("http://localhost:3080/file/images")
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
                            <img src={`http://localhost:3080/file/image/${element.Key}`} width="250" height="250" alt="pic" style={{margin: 5}}/>
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
