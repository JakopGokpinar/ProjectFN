import React from "react";
import { useState } from "react";
import "./SearchResult.css";

import ProductCard from "../../Component/ProductCard/ProductCard.js";

// import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";

function SearchResult(props) {
  // const queryParams= new URLSearchParams(props.location.search);  // get query parameter from url. queryParams.get('');
  const results = props.location.state;

const [sortOn, setSortOn] = useState('published');
const [sortedItems, setSortedItems] = useState(results);
const [resultCount, setResultCount] = useState(results.length);

 function setSortingCategory(e) {
  var sorting = e.target.value;
  setSortOn(sorting);
 }

 function applyFilter () {
   console.log("filtered...")
 }

 React.useEffect(() => {
  switch(sortOn){
    case "published":
      setSortedItems(results);
      break;
   case "lowToHigh":
     let lowData = [].concat(results)
     .sort((a, b) => a.annonce.price > b.annonce.price ? 1 : -1)
      setSortedItems(lowData)
      break;
   case "hightToLow":
    let highData = [].concat(results)
    .sort((a, b) => a.annonce.price < b.annonce.price ? 1 : -1)
     setSortedItems(highData)
     break;
   default: 
      setSortedItems(results)
     return console.log("default");
  }
 }, [sortOn])

  return (
    <div className="container searchResultPageContainer">
      <div className="searchFilterComponents">
        <button className="btn btn-primary w-100" onClick={applyFilter}>Bruk Endringer</button>
        <button className="btn btn-primary w-100">Lagre Søk</button>
        <Price />
        <Status></Status>
      </div>
      <div className="searchResults">
        <div className="searchResults_Info">
          <div className="searchResults_Order">
            <p style={{ margin: 0 }}>{resultCount} treff</p>
            <div>
            <label htmlFor="cars">Sort</label>
            <select className="form-control" style={{width: 200}}  name="cars" id="cars" onChange={setSortingCategory}>
              <option value="published">Publisert</option>
              <option value="lowToHigh">Pris lav til høy</option>
              <option value="hightToLow">Pris høy til lav</option>
            </select>
            </div>
          </div>

          <div className="searchResults_Tags">
            <span id="filterTag">Brukt</span>
            <span id="filterTag">Til salgs</span>
          </div>
        </div>
        <div className="searchResults_Items">
        

         
          <div className="row">
            {
              sortedItems.map((item, index) => {
                  return(
                    <>
                    <div className="col">
                      <ProductCard
                      key={item.annonce._id}
                      img={item.annonce.images}
                      price={item.annonce.price}
                      name={item.annonce.title}
                      id={item.annonce._id}
                    />
                    </div>
                    {index %2 !== 0 && <div className="w-100"></div>}
                    </>
                  )
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;