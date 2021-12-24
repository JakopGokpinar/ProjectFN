import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './ProductCard.css';

function ProductCard (props){

  if(props.annonce) {
    props = props.annonce;
  }

  const [images,title,location,price,id] = [
    props.img , 
    props.name || "no name",
    props.location || "Kristiansand",
    props.price || '0',
    props.id || null
  ];

  const [isHovered, setHovered] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);

  return(
    <div className={"card h-100 border rounded " + (isHovered && " shadow")} >
          <Link to={`/produkt/${id}`}>
            <div className="card-img" 
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}>  
            <div className="photo-div">
              {isHovered && <button className="btn btn-light rounded-circle prev-button" onClick={(e) => { e.preventDefault(); imgIndex !== 0 && setImgIndex(imgIndex-1)}}><i className="fas fa-arrow-left"/></button>}
              <img src={images.length > 0 ? images[imgIndex].location : 'https://static.toiimg.com/photo/msid-58515713,width-96,height-65.cms' }  className="img-responsive w-100" alt="" id="product-photo"></img>
              {isHovered && <button className="btn btn-light rounded-circle next-button" onClick={(e) =>{ e.preventDefault(); imgIndex < images.length-1 && setImgIndex(imgIndex+1)}}><i className="fas fa-arrow-right"/></button>}
            </div>                                
          </div> </Link>                 
        <div className="card-body d-flex flex-column">
          <div className="d-flex mb-2">
            <h5 className="card-title" id="pris">{price + " kr"}</h5>
            <p className="card-text" id="pris">&middot;</p>
            <p className="card-text" id="pris">{location}</p>
            <div className="ms-auto">
              <button className="btn btn-primary me-2" data-toggle="tooltip" title="Send Message" onClick={((e) => e.preventDefault())}><i className="fas fa-envelope"></i></button>
              <button type="button" className="btn btn-outline-danger" data-toggle="tooltip" title="Add to Favorites" onClick={((e) => e.preventDefault())}><i className="fas fa-heart"></i></button>
            </div>
          </div>
          <p className="card-text me-2" style={{pointerEvents: 'none'}}>{title}</p>             
        </div>
      </div>      
  )   
}

export default ProductCard;