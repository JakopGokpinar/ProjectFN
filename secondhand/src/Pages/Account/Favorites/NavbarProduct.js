import "./NavbarProduct.css";

function NavbarProduct() {
    return(
        <div className="navbarProduct">
            <div className="navbarProduct__search">
                <input type="text" className="form-control searchField" placeholder="Søk i Motorer..."></input>
            </div>
            <div className="navbarProduct__buttons"> 
                <div className="buttons__operation">
                    <i className="fas fa-times fa-lg"></i>
                    <i className="fas fa-exchange-alt fa-lg transferProductIcon"></i>
                    <i className="fas fa-trash deleteProductIcon"></i>
                </div>
                <button className="btn btn-secondary">Velg Produkter</button>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Sist lagt til</option>
                    <option selected>Sist oppdatert</option>
                    <option value="1">Pris lav-høy</option>
                    <option value="1">Pris høy-lav</option>
                    <option value="1">Status</option>
                </select>
            </div>
        </div>
    )
}

export default NavbarProduct;