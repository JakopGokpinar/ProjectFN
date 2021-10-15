import { useState } from 'react';
import './ProductCard.css';

import ProductStatusTag from '../../../Component/ProductStatusTag/ProductStatusTag.js';

function ProductCard() {

    const [onHover, setHover] = useState(false);

    return(
        <div className="chat__products">
            <div className={"chatProduct__frame border rounded " + (onHover && " shadow")}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}>
                <div className="chatProduct__content">
                    <img className="chatProduct__img" alt=""
                        src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.movement.as%2Fimages%2Fproducts%2F36709%2Fbig_fb0ba644786612937cee3d4c82a22b41cfa0c0f7.jpg&f=1&nofb=1"
                    ></img>
                    <div className="chatProduct__properties">
                        <p className="chatProduct__title">Pent brukt borddd</p>
                        <ProductStatusTag status="active"></ProductStatusTag>
                        <p className="chatProduct__price">234-,</p>
                    </div>
                    <div className="chatProduct__seller ms-auto">
                        <div className="seller__nameAndPhoto">
                            <img className="seller__img" alt=""
                                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.publicdomainpictures.net%2Fpictures%2F230000%2Fvelka%2Fcomputer-user.jpg&f=1&nofb=1"
                            ></img>
                            <p className="seller__name">Fernandezfdsfsfsdfdsfds</p>
                        </div>
                        <div className="dropdown chatProduct__options">
                            <span type="button" aria-expanded="false" data-bs-toggle="dropdown" id="dropdown"><i class="fas fa-ellipsis-v fa-lg"></i></span>
                            <ul className="dropdown-menu" aria-labelledby="dropdown">
                                <li><button type="button" className="dropdown-item">Fjern</button></li>
                                <li><button type="button" className="dropdown-item">Velg</button></li>
                                <li><button type="button" className="dropdown-item">Se detaljer</button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard;