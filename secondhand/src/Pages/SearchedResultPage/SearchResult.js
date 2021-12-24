import React from "react";
import "./SearchResult.css";
import ProductCard from "../../Component/ProductCard/ProductCard.js";

import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";

function SearchResult(props) {
  // const queryParams= new URLSearchParams(props.location.search);  // get query parameter from url. queryParams.get('');
  const results = props.location.state;

  return (
    <div className="container searchResultPageContainer">
      <div className="searchFilterComponents">
        <button className="btn btn-primary w-100">Bruk Endringer</button>
        <button className="btn btn-primary w-100">Lagre Søk</button>
        <Price />
        <Status></Status>
      </div>
      <div className="searchResults">
        <div className="searchResults_Info">
          <div className="searchResults_Order">
            <p style={{ margin: 0 }}>109 treff</p>
            <select name="cars" id="cars">
              <option value="volvo">Publisert</option>
              <option value="saab">Pris lav til høy</option>
              <option value="mercedes">Pris høy til lav</option>
            </select>
          </div>

          <div className="searchResults_Tags">
            <span id="filterTag">Brukt</span>
            <span id="filterTag">Til salgs</span>
          </div>
        </div>
        <div className="searchResults_Items">
          {results.map((item) => {
            console.log("item: ", item);
            return (
              <ProductCard
                key={item.annonce._id}
                img={item.annonce.images}
                price={item.annonce.price}
                name={item.annonce.title}
                id={item.annonce._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
