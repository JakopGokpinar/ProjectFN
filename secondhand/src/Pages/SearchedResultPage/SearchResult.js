import React from "react";
import { useState , useLayoutEffect } from "react";
import "./SearchResult.css";


import ProductCard from "../../Component/ProductCard/ProductCard.js";
import { instanceAxs } from "../../api/Api";
// import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";

function SearchResult(props) {
  // const queryParams= new URLSearchParams(props.location.search);  // get query parameter from url. queryParams.get('');
  // const results = props.location.state;

const [sortOn, setSortOn] = useState('published');
const [items, setItems] = useState([]);
const [sortedItems, setSortedItems] = useState(items);
//eslint-disable-next-line
const [resultCount, setResultCount] = useState(items.length);
const urlParams = new URLSearchParams(props.location.search); 
//eslint-disable-next-line
const [queryParams, setQueryParams] = useState({"q": urlParams.get('q'), "price_min": -2});

 function setSortingCategory(e) {
  var sorting = e.target.value;
  setSortOn(sorting);
 }

 function applyFilter () {
   console.log("filtered...")
 }

 function changePrice(priceArr) {
   var minPrice = priceArr[0];
   var maxPrice = priceArr[1];

   let params = {...queryParams, "price_min":minPrice, "price_max":maxPrice};
   setQueryParams(params);
   console.log("price value changed");
   console.log(params)
 }

 function makeSearch() {
  var queryString = '';
  Object.entries(queryParams).forEach(([key, value]) => queryString += `${key}=${value}&`);
  if(queryString[queryString.length -1] === '&') queryString = queryString.slice(0,queryString.length-1);
  
  console.log(queryString)
  let query = `/search?${queryString}`;
  instanceAxs.get(query)
    .then(response => { 
      console.log("Search response", response);
      var returnedItems = response.data.items
      setItems(returnedItems);
      props.history.push( `/search?${queryString}`);            
    })
    .catch(err => {
        console.log(err)
    })
 }

 useLayoutEffect(() => {
  makeSearch();
}, []);

 React.useEffect(() => {
  switch(sortOn){
    case "published":
      setSortedItems(items);
      break;
   case "lowToHigh":
     let lowData = [].concat(items)
     .sort((a, b) => a.annonce.price > b.annonce.price ? 1 : -1)
      setSortedItems(lowData)
      break;
   case "hightToLow":
    let highData = [].concat(items)
    .sort((a, b) => a.annonce.price < b.annonce.price ? 1 : -1)
     setSortedItems(highData)
     break;
   default: 
      setSortedItems(items)
     return console.log("default");
  }
 }, [sortOn, items])

  return (
    <div className="container searchResultPageContainer">
      <div className="searchFilterComponents">
        <button className="btn btn-primary w-100" onClick={applyFilter}>Bruk Endringer</button>
        <button className="btn btn-primary w-100">Lagre Søk</button>
        <Price function={changePrice}/>
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