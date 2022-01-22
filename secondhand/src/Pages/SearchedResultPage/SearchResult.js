import React from "react";
import { useState } from "react";
import "./SearchResult.css";
import ProductCard from "../../Component/ProductCard/ProductCard.js";
import { instanceAxs } from "../../api/Api";
// import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";
import { useEffect } from "react";

function SearchResult(props) {
  const [items, setItems] = useState([]);
  const [resultCount, setResultCount] = useState(items.length);
  const [filters, setFilters] = useState({});
  const urlParams = new URLSearchParams(props.location.search);

  function setSortingCategory(e) {
    var sorting = e.target.value;
    setFilter("order", sorting);
  }

  function getFiltersOnMount() {
    let params = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
      console.log({ key, value });
    }
    console.log(params);
    setFilters(params);
    return params;
  }

  function makeSearch() {
    var queryString = "";
    Object.entries(filters).forEach(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    if (queryString[queryString.length - 1] === "&")
      queryString = queryString.slice(0, queryString.length - 1);

    console.log(queryString);
    let query = `/search?${queryString}`;
    instanceAxs
      .get(query)
      .then((response) => {
        console.log("Search response", response);
        if (response.data.status) {
          var returnedItems = response.data.items;
          setItems(returnedItems);
          setResultCount(returnedItems.length);
          window.history.pushState("page2", "seach made", query);
        } else {
          return console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const setFilter = (filter, prop) => {
    let params = filters;
    params[filter] = prop;
    console.log(params);
    setFilters(params);
  };

  useEffect(() => {
    let params = getFiltersOnMount();
    console.log(filters);
    var queryString = "";
    Object.entries(params).forEach(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    if (queryString[queryString.length - 1] === "&")
      queryString = queryString.slice(0, queryString.length - 1);

    console.log(queryString);
    let query = `/search?${queryString}`;
    instanceAxs
      .get(query)
      .then((response) => {
        console.log("Search response", response);
        if (response.data.status) {
          var returnedItems = response.data.items;
          setItems(returnedItems);
          setResultCount(returnedItems.length);

          props.history.push(`/search?${queryString}`);
        } else {
          return console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container searchResultPageContainer">
      <div className="searchFilterComponents">
        <button className="btn btn-primary w-100" onClick={makeSearch}>
          Bruk Endringer
        </button>
        <button
          className="btn btn-primary w-100"
          onClick={() => console.log(filters)}
        >
          Lagre Søk
        </button>
        <Price setfilter={setFilter} />
        <Status></Status>
      </div>
      <div className="searchResults">
        <div className="searchResults_Info">
          <div className="searchResults_Order">
            <p style={{ margin: 0 }}>{resultCount} treff</p>
            <div>
              <label htmlFor="cars">Sort</label>
              <select
                className="form-control"
                style={{ width: 200 }}
                name="cars"
                id="cars"
                onChange={setSortingCategory}
              >
                <option value="published">Publisert</option>
                <option value="price_desc">Pris lav til høy</option>
                <option value="price_asc">Pris høy til lav</option>
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
            {items.map((item, index) => {
              return (
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
                  {index % 2 !== 0 && <div className="w-100"></div>}
                </>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
