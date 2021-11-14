import { useEffect, useState } from "react";
import { instanceAxs } from "../../../api/Api";

function PhotoAndDescription() {
    const [doc, setDoc] = useState();
    const [images, setImages] = useState();
    const [loading, setLoading] = useState(true);
    const [img, setImg] = useState();

    const onFileChange = event => {
        console.log(event.target.files[0])
        const ImageUrl =  URL.createObjectURL(event.target.files[0]);
        setDoc(ImageUrl)
    };

    const submit = (e) => {
        e.preventDefault();

        var newAnnonce = doc;

        instanceAxs.post('/uploadimage', newAnnonce)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }

    const getImages = () => {
        instanceAxs.get('/file?filename=ss1.png')
            .then(result => {
                console.log(result);
                
                let binary = Buffer.from(result.data); //or Buffer.from(data, 'binary')
                let imgData = new Blob(binary.buffer, { type: 'application/octet-binary' });
                let link = URL.createObjectURL(imgData);
                URL.revokeObjectURL(link);
                console.log(link)
                setImg(link)
                setLoading(false);

                /*let filesAmount = files.length;
                for (var i = 0; i < filesAmount; i++) {
                    let reader = new FileReader();
                    reader.onload = (event) => {
                        return(
                            <img src={event.target.result} id="fdsa" alt="pic1" width="250" height="250" />
                        )
                    }
                    reader.readAsDataURL(files[i]);
                }*/
            }) 
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        getImages();
    },[loading])

    return(
        <div className="mb-5 mt-5">
            <form encType="multipart/form-data" action="/user/uploadimage" method="POST" >
                <h3>Bilder, Videoer og Beskrivelse</h3>
                <label className="form-label" for="image">Bilder</label> 
                <div  className="input-group mb-3">
                    <input className="form-control-file" type="file" id="file" name="file" onChange={onFileChange}></input>
                </div>
                <div>
                    {!loading && 
                    <img src={img} id="ss" alt="pic1" width="250" height="250"/>
                    
                    }
                </div>
                {/*<div>
                    { images !== undefined &&
                        
                        images.map((img) => {
                            let reader = new FileReader();
                            reader.onload = (event) => {
                                return(
                                    <img src={event.target.result} id="fdsa" alt="pic1" width="250" height="250"/>
                                )
                            };
                           // reader.readAsDataURL(img);                            
                        })
                    }
                    </div>
                <img src={doc} id="fdsa" alt="pic1" width="250" height="250" />
                <label className="form-label">Video</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" id="video"></input>
                </div>
                <label htmlFor="description" className="form-label">Beskrivelse</label>
                <div className="input-group mb-3">
                    <textarea className="form-control" id="description" rows="3"/>
                </div>*/}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PhotoAndDescription;