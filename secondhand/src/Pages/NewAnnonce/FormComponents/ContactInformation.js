function ContactInformation() {
    return(
        <div className="mt-5 mb-5">
            <h3>Kontakt Informasjon</h3>
            <label className="form-label">Navn</label>
            <div className="form-group mb-3">
                <input type="text" className="form-control"></input>
            </div>
            <label className="form-label">Gateaddresse</label>
            <div className="form-group mb-3">
                <input type="text" className="form-control"></input>
            </div>
        </div>
    )
}

export default ContactInformation;