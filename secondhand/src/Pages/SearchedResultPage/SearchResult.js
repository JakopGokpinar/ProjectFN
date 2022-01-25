import React from "react";
import { useState } from "react";
import "./SearchResult.css";
import ProductCard from "../../Component/ProductCard/ProductCard.js";
import { instanceAxs } from "../../api/Api";
// import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";
import Tags from "./FilterComponents/Tags.js";
import { useEffect } from "react";

function SearchResult(props) {
  const [items, setItems] = useState([]);
  const [resultCount, setResultCount] = useState(items.length);
  const [filters, setFilters] = useState({});
  const urlParams = new URLSearchParams(props.location.search);
  const [tagArray, setTagArray] = useState([{key: "Bebek"}])

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
    if(filter === "status"){
      let parameters = filters;
      let val = parameters["status"];
      if(val === undefined || val === null) val = "";
      if (!val.includes(prop)) val += " " + prop;
      val = val.trim();
      parameters["status"] = val;
      setFilters(parameters);
    } else {
      let paramss = filters;
      paramss[filter] = prop;
      setFilters(paramss);
    }
      addFilterTag(filter)
  };

  function addFilterTag(filter){
    let tagArr = tagArray;
    tagArr.push({key: filter})
    setTagArray(tagArr);
  }

  const resetFilter = (filter,filterOrProp,property) => {    // remove a filter completely or erase a prop of it
    var prop = property || undefined;
    console.log("prop",prop)
    if (filterOrProp === "prop"){
      let params = filters;
      if (params[filter] !== undefined  && params[filter] !== null && prop !== undefined) {
        let parameter = params[filter];
        let newparameter = parameter.replace(prop,"");
        newparameter = newparameter.trim();
        console.log(newparameter);
        params[filter] = newparameter;
        if (params[filter] === '') delete filters[filter];
        console.log(filters);
      }
    }
     else {      
      let params = filters;
      if (params[filter] !== undefined && params[filter] !== null){
        delete filters[filter]
        console.log(filters);
    }
  }
}

function removeTag(filter){
  delete filters[filter];
  tagArray.shift()
  
  console.log("tag removed")
}
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
    <div className="container-fluid searchResultPageContainer">
      <div className="searchFilterComponents">
        <button className="btn btn-primary" onClick={makeSearch}>
          Bruk Endringer
        </button>
        <button
          className="btn btn-primary "
          onClick={() => console.log(filters)}
        >
          Lagre Søk
        </button>
        <Price setfilter={setFilter} />
        <Status setfilter={setFilter} resetFilter={resetFilter}></Status>
      </div>
      <div className="searchResults">
        <div className="searchResults_Info">
          <div className="searchResults_Order ">
            <p style={{ margin: 0 }}>{resultCount} treff</p>

            <div>
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

        <div className="filterTagsContainer">
        {
            tagArray.map(tag => {
              return <Tags tag={tag} removeTag={removeTag}/>
            })
          }
        </div>
          
                  </div>
        <div className="searchResults_Items">
            {items.map((item, index) => {
              return (
                <>
                  <div className="itemCol">
                    <ProductCard
                      key={item.annonce._id}
                      img={item.annonce.images}
                      price={item.annonce.price}
                      name={item.annonce.title}
                      id={item.annonce._id}
                    />
                  </div>
                </>
              );
            })}
        </div>
      </div>

    </div>
  );
}

export default SearchResult;
