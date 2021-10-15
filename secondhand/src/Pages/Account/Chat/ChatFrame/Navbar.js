import { Link } from 'react-router-dom';
import "./Navbar.css";

import ProductStatusTag from '../../../../Component/ProductStatusTag/ProductStatusTag.js';

function Navbar() {
    return(
        <div className="chatFrame__navbar">
            <nav className="navbar bg-light">
                <div className="container-fluid">
                    <div className="navbar__contact">
                        <Link className="nav-item navbar__profileLink" to="#">
                            <img className="contact__photo" alt=""
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.movement.as%2Fimages%2Fproducts%2F36709%2Fbig_fb0ba644786612937cee3d4c82a22b41cfa0c0f7.jpg&f=1&nofb=1"
                            ></img>
                            <div className="contact__nameAndStatus">
                                <p className="contact__name noneMgnPar">Ahmet Gokpinar</p>
                                <p className="lastSeen noneMgnPar">Sist sett 27.06.2021 21:27</p>
                            </div>
                        </Link>
                    </div>
                    <div className="nav-item navbar__product">
                        <Link className="" to="#">
                            <img className="product__photo" alt=""
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.movement.as%2Fimages%2Fproducts%2F36709%2Fbig_fb0ba644786612937cee3d4c82a22b41cfa0c0f7.jpg&f=1&nofb=1"
                            ></img>
                        </Link>
                        <div className="product__properties">
                            <p className="product__name noneMgnPar">Pent brukt bord</p>
                            <div className="product__attributes">
                                <p className="noneMgnPar">&middot; 234,-</p>
                                <p className="noneMgnPar">&middot; Norheimsund</p>
                                <ProductStatusTag status="active"></ProductStatusTag>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;