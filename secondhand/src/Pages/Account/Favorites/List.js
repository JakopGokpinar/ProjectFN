import { useState } from "react";
import { Link } from "react-router-dom";
import "./List.css";

function List(props) {
    const [isHover, setHover] = useState(false);

    return(
        <div className={"list__frame border rounded  " + (isHover && " shadow ")} 
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}>
            <Link to={props.link}>
            <div className="list__content">
                <div className="list__img ">
                    <img className="img" alt="" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.motorcycle.com%2Fblog%2Fwp-content%2Fuploads%2F2020%2F12%2F12072020-2021-Honda-Trail-125-Review-11.jpg&f=1&nofb=1"/>
                </div>
                <div className="list__features">
                    <div>
                        <h5 className="list__text">Mine funn</h5>
                        <p className="list__text">15 annonser</p>                    
                    </div>
                    <div className="dropdown">
                        <span type="button" aria-expanded="false" data-bs-toggle="dropdown" id="dropdown"><i className="fas fa-ellipsis-v fa-lg"></i></span>
                        <ul className="dropdown-menu" aria-labelledby="dropdown">
                            <li><button type="button" className="dropdown-item">Fjern</button></li>
                            <li><button type="button" className="dropdown-item">Rediger</button></li>
                            <li><button type="button" className="dropdown-item">Velg</button></li>
                            <li><button type="button" className="dropdown-item">Se detaljer</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            </Link>
        </div>
    )
}

export default List;