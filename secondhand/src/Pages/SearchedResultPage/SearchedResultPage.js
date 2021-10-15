import React from 'react';
import './SearchedResultPage.css';
import data from '../../data/products.json';
import ProductCard from '../../Component/ProductCard/ProductCard.js';    

import Date from '../../SortingCategories/Date';
import Price from '../../SortingCategories/Price';
import Status from '../../SortingCategories/ProductStatus';


const SearchedResutPage = ({ match }) => {
 
    return(
        <div className="container main-con">
            <div className="product-categories">
                <p>Eindom</p>
                <div class="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Søk i eindom..."></input>
                    <button class="btn btn-outline-secondary" type="button"><i class="fas fa-search"></i></button>                    
                </div>
                <button className="btn btn-info w-100 mb-2">Lagre Søk</button>
                <button className="btn btn-primary w-100 mb-5">Bruk Endringer</button>
                <Price></Price>
                <Date></Date>  
                <Status></Status> 
            </div>
            <div className="products-div">
                <div className="sort-dropdown-menu">
                    <span>34 Treff</span>
                    <select class="form-select" id="sortby-menu" style={{width: "200px"}}>
                        <option defaultValue value="publishedNew">Nyeste først</option>
                        <option value="publishedOld">Eldste først</option>
                        <option value="priceLowHigh">Pris lav-høy</option>
                        <option value="priceHighLow">Pris høy-lav</option>
                    </select>           
                </div>
                <div className="tags">
                    <span className="border rounded-pill">Mazda</span>
                    <span className="border rounded-pill">Til Salgs</span>
                </div>
                <div className="products">
                    <div class="row">  
                        {data.map(data => {
                            return(
                                <div class="col-md-4 mb-4" key={data.name}>
                                    <ProductCard 
                                        img={data.images} 
                                        price={data.price} 
                                        name={data.name} 
                                        location={data.location} 
                                        id={data.id}
                                        data={data}/>
                                </div>
                            ) 
                        })}                                                      
                    </div>
                </div>  
            </div>
        </div>
    )
}

export default SearchedResutPage;