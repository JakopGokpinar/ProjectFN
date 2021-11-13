import React, { useState } from 'react';
import data from '../../data/products.json';
import { Redirect } from 'react-router-dom';
import './ProductPage.css';


const ProductPage = ({match}) => {

    const product = data.find(product => {
        return match.params.annonceId === product.id;      
        //return match.params.id === product.id;
    })
    const [images] = [product.images];
    //     const [images,title,location,price,id] = [product.images, product.name,product.location,product.price,product.id];

    const [isHovered, setHovered] = useState(false);
    const [imgIndex, setImgIndex] = useState(0);
    const [isCardVisible,setCardVisible] = useState(false);

    var imageCount = images.length;

    function onHover(type) {
        setHovered(type === "true" ? true : false);
    }

    function switchImgButton(type){
        setImgIndex(type === "next" ? (imgIndex+1 < imageCount ? imgIndex + 1 : imgIndex) : (imgIndex-1 >= 0 ? imgIndex-1 : imgIndex));
    }
    
    function switchImgPhoto(img){
        setImgIndex(images.indexOf(img));
    }

    return(
        <div className="productPage-container">
            {product !== undefined 
            ? <div className="pp-container">
                <div  id="frame">

                    <div id="photo-frame" className="border rounded" onMouseEnter={() => onHover("true")} onMouseLeave={() => onHover("false")}>
                        
                        <div className="big-photo-div">
                            {isHovered && <button className="btn btn-primary prev-button" onClick={() => switchImgButton("prev")}><i class="fas fa-chevron-left"></i></button>}
                            <img src={images[imgIndex].link} alt="" id="product-big-image"></img>
                            {isHovered && <button className="btn btn-primary next-button" onClick={() => switchImgButton("next")}><i class="fas fa-chevron-right"></i></button>}
                        </div>
                        <p id="photo-desc">{`${images[imgIndex].description} (${imgIndex+1}/${imageCount})`}</p>

                        <div className="small-photo-div">
                            <ul>
                                {images.map((img,i) => {
                                    return(
                                        <li key={i}>
                                            <img src={img.link} alt="" id="product-small-img" 
                                            className={`border rounded m-2 ${img.link === images[imgIndex].link ? "border-3 border-primary" : "border-1 border-secondary"}`}
                                            onClick={() => switchImgPhoto(img)}
                                            ></img> 
                                        </li>
                                    )
                                })}                     
                            </ul>
                        </div>
                    </div>

                    <div id="saler-frame">
                        <p>{product.name}</p>
                        <hr></hr>
                        <div id="saler-info-div">
                            <div id="saler-information" className="bg-primary rounded">
                                <img src={product.images[0].link} className="border border-2 rounded-circle" alt="100x100" id="saler-photo"></img>
                                <h6>Ahmet Gokpinar</h6>
                                <div id="saler-current-stat">
                                    <small>3 minutt siden</small>
                                    <small>svarer om 10 minutt</small>
                                </div>
                                <div className="card">
                                    <div className="card-header bg-info shadow-lg" onClick={() => setCardVisible(!isCardVisible)}>
                                        <div className="" id="saler-point-circle">8.8</div>
                                        <p className="">Selger Poeng</p>
                                        <p><i class="fas fa-chevron-down"></i></p>
                                    </div>
                                    {isCardVisible &&                 
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item">
                                                    <div id="saler-point-circle">10</div>
                                                    <p>Problemfri Betaling</p>
                                            </li>
                                            <li class="list-group-item" >
                                                    <div id="saler-point-circle">10</div>
                                                    <p>Problemfri Betaling</p>
                                            </li>
                                            <li class="list-group-item" >
                                                    <div id="saler-point-circle">10</div>
                                                    <p>Problemfri Betaling</p>
                                            </li>
                                    </ul>
                                    }                         
                                </div>
                                <button className="btn btn-primary w-100"><i className="fas fa-envelope me-2"></i>Send Melding</button>
                            </div>
                        </div>
                        <div id="process-buttons">
                            <hr/>
                            <button className="btn btn-outline-danger me-3"><i className="fas fa-heart me-2"></i>Legg til Favoriter</button>
                            <button className="btn btn-outline-secondary"><i className="fas fa-link me-2"></i>Del Produkt</button>
                        </div>
                    </div> 
                </div>
                <div className="border border-1 product-descripton">
                    <p>Brreitling Chronomat med inhouse caliber B01, 42 mm, referansenummer AB0134101B1A1. <br></br>

Er ifølge forrige eier kjøpt hos Lervik Ur i 2021. Jeg fikk denne som del av en byttehandel uten kvittering. Garantien går ut 01.07.2026 ifølge Breitlings register. Hvis det er ønskelig kan jeg eventuelt kontakte Lervik Ur for å få kjøpsdato bekreftet.

Klokka er lite brukt og ser ut som den er ny. Hairlines kan trolig finnes med bruk av lupe.

Nypris for denne er kr. 85.050,-

For tekniske detaljer:
https://www.breitling.com/no-en/watches/chronomat/chronomat-b01-42/AB0134101B1/

Kan sende mot at kjøper betaler frakt (EON).

Omega Rolex IWC Oris Heuer Tudor Zenith Panerai</p>
                </div>
           </div>    
            : <Redirect to="/notfound"></Redirect>} 
        </div>
    )   
                 
}

export default ProductPage;
