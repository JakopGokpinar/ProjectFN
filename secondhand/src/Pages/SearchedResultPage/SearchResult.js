import React from 'react';
import './SearchResult.css';
// import ProductCard from '../../Component/ProductCard/ProductCard.js';    

/* import Date from './SortingCategories/Date';
import Price from './SortingCategories/Price';
import Status from './SortingCategories/ProductStatus'; */

const SearchResult = ({ match ,props}) => {
 
    return(
        <div className="container">
            <p>{props.locations.state}</p>
        </div>
    )
}

export default SearchResult;