import "./ListProduct.css";
import Nature from "../../../resources/nature.jpg";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";

function ListProdukt({ listId }) {

    const [isHover, setHover] = useState(false);
    const { favListId } = useParams();

    return(
        <div className={"product__frame border rounded  " + (isHover && " shadow ")} 
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}>         
            <Link  className="link" to="/product/1"><div className="product__content">
                <div className="content__img">
                    <img className="img" src={Nature} alt=""></img>
                </div>
                <div className="content__props ">
                    <div className="content__title">
                        <p className="title listProductParagraph"><b>{favListId}</b></p>
                    </div>
                    <div className="content__statAndPlace">
                        <span className="stat border border-primary bg-primary rounded-pill">Aktiv</span>
                        <small>Sandefjord</small>
                    </div>
                    <div className="content__price">
                        <p className="price listProductParagraph"><b>45 000,-</b></p>
                    </div>
                    <div className="content__extraProperties">
                        <p className="listProductParagraph">3245 km &middot;</p>
                        <p className="listProductParagraph">3 soverom &middot;</p>
                        <p className="listProductParagraph">2018</p>
                    </div>
                    <div className="content__category">
                        <small>Leilighet</small>
                    </div>
                </div>           
                    { isHover &&
                    <div className="content__buttons ms-auto me-5">
                        <button className="btn btn-danger">Fjern</button>
                        <button className="btn btn-primary mt-2 mb-2">Overføre andre list</button>
                        <button className="btn btn-primary">Velg</button>
                    </div>
                    }
            </div>
            </Link>
        </div>      
    )
}

export default ListProdukt;