function ContactInformation(props) {
    return(
        <div className="mt-5 mb-5">
            <h4>Seller</h4>
            <label className="form-label">Navn</label>
            <div className="form-group mb-3">
                <input type="text" className="form-control" id="name" onChange={props.onchange}></input>
            </div>
            <label className="form-label">Gateaddresse</label>
            <div className="form-group mb-3">
                <input type="text" className="form-control"></input>
            </div>
        </div>
    )
}

export default ContactInformation;