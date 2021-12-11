import "./NavbarList.css";

function NavbarList() {
    return(
        <div className="navbar__list">
            <div className="navbar__search">
                <input type="text" className="form-control searchField" placeholder="Søk i lister..."></input>
            </div>
            <div className="navbar__buttons"> 
                <i className="fas fa-trash deleteList"></i>
                <button className="btn btn-dark">Velg list</button>
                <button className="btn btn-primary">Ny list</button>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Opprettet</option>
                    <option value="1">Alfabetisk</option>
                </select>
            </div>
        </div>
    )
}

export default NavbarList;