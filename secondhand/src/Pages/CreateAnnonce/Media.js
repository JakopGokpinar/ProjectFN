import { useState } from "react";
import axios from "axios";
import { getCroppedImage } from "../../utils/cropImage";
import { dataURLtoFile } from "../../utils/dataURltoFile";

function PhotoAndDescription(props) {
    const [images, setImages] = useState();

    const onFileChange = event => {
        if(event.target.files && event.target.files.length > 0){
            var imgArr = [];
            for (var i = 0; i < event.target.files.length; i++){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.addEventListener('load', () => {
                    imgArr.push(reader.result);
                    //console.log(reader.result);
                })
            }
            setImages(imgArr);
            props.onchange(imgArr);
        }
    };

    const uploadImages = async (e) => {
        e.preventDefault();
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
            axios.post( 'http://localhost:3080/file/createannonce?location=ahmet/annonces/annonce1', formData)
                .then(response => {
                    console.log(response)
                })
                .catch(err => {
                    console.log(err);
                })
            /* await axios.post('http://localhost:3080/user/newannonce',{fileLocation})
            .then(response => {
                console.log(response.data);
            })
            .catch(err => {
                return console.log(err)
            }) */
        }
    }

    return(
        <div className="mb-5 mt-5">
            <form encType="multipart/form-data" onSubmit={uploadImages}>
                <h4>Media</h4>
                <div  className="input-group mb-3">
                    <input className="form-control" accept="image/*" type="file" id="file" name="file" onChange={onFileChange} multiple></input>
                </div>
                <div>
                    { (images !== undefined) &&
                        images.map(element => {
                            return(
                                <img src={element} key={`${Date.now()}`} id="image" alt="pic1" width="250" height="250" />
                            )
                        })
                    }
                </div>
            </form>
        </div>
    )
}

export default PhotoAndDescription;