function PhotoAndDescription(props) {

    const onFileChange = event => {
        if(event.target.files && event.target.files.length > 0){
            var imgArr = [];
            for (var i = 0; i < event.target.files.length; i++){
                let reader = new FileReader();
                reader.readAsDataURL(event.target.files[i]);
                reader.addEventListener('load', () => {
                    imgArr.push(reader.result);
                })
            }
            props.onchange(imgArr);
        }
    };

    return(
        <div className="mb-5 mt-5">
                <h4>Media</h4>
                <div  className="input-group mb-3">
                    <input className="form-control" accept="image/*" type="file" id="file" name="file" onChange={onFileChange} multiple></input>
                </div>
        </div>
    )
}

export default PhotoAndDescription;