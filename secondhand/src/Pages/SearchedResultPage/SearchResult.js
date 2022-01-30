import React from "react";
import "./SearchResult.css";
import ProductCard from "../../Component/ProductCard/ProductCard.js";
import { instanceAxs } from "../../api/Api";
// import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";
import Tags from "./FilterComponents/Tags.js";
/* 
filtersWithMultipleParams = ["status","location"];
filter = {key: 'price_max', value:89000 default:90000}, 'status': 'used new'}
tag = [
{key: "statusUsed",value: "Used", filterKey: 'status', filterValue:'used'}, 
{key: "statusNew", value: "New", filterKey: 'status', filterValue: 'new'},
{key: "maxPrice", value: "til 1800", filterKey: 'price_max', filterValue: 1800}
]

addFilter(filterKey, filterValue, tagKey, tagValue){
  filter = {filterKey, filterValue}
  addTag(filterKey, filterValue, tagKey, tagValue)
}
removeFilter(filterKey, filterValue){
  var filterObject = filter.find(filterKey);
  if(filtersWithMultipleparams[filterObject] !== -1){
    remove(filterObject.value.filterValue)
    if(filterObject.value === ''){
      remove(filterObject)
    }
  } else {
    remove(filterObject)
  }
}
addTag(filterKey, filterValue, tagKey, tagValue){
  tag = {key: tagKey, value: tagValue, filterKey, filterValue}
}
removeTag(tagKey,filterKey, filterValue){
  tag.remove(tagKey)
  this.removeFilter(filterKey, filterValue)
}
*/
class SearchResult extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [],   
      filtersWithMultipleQueries: ["status","location"],
      resultCount: 0,
      tagArray: [],
      urlParams: new URLSearchParams(props.location.search),
      filters: {q: new URLSearchParams(props.location.search).get('q')},
      minAndMaxPrice: undefined,
    };
  }

  setSortingCategory = (e) => {
    var sorting = e.target.value;
    this.setFilter("order", sorting, sorting);
  };

  getFiltersOnMount = () => {
    let urlParams = this.state.urlParams;
    
    var params = {};
    for (const [key, value] of urlParams) {
      params[key] = value;
      console.log({ key, value });
    }
    this.setState({
      filters:params
    });
    return params;
  };

  makeSearch = () => {
    let filters = this.state.filters;
    var queryString = "";
    Object.entries(filters).forEach(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    if (queryString[queryString.length - 1] === "&")
      queryString = queryString.slice(0, queryString.length - 1);

    let query = `/search?${queryString}`;
    instanceAxs
      .get(query)
      .then((response) => {
        console.log("Search response", response);
        if (response.data.status) {
          var returnedItems = response.data.items;
          this.setState({
            items: returnedItems,
            resultCount: returnedItems.length,
          });
          window.history.pushState("page2", "seach made", query);
        } else {
          return console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  addFilterTag = (key, value, queryKey, queryValue) => {
    let tagArr = this.state.tagArray;
    var object = tagArr.find((obj) => obj.key === key);
    var objIndex = tagArr.indexOf(object);
    if (objIndex !== -1) {
      tagArr[objIndex] = {
        key,
        value: value,
        queryKey,
        queryValue: queryValue,
      };
    } else {
      tagArr.push({
        key: key,
        value: value,
        queryKey: queryKey,
        queryValue: queryValue,
      });
    }
    this.setState({
      tagArr: tagArr,
    });
    console.log("tagarr",tagArr)
  };

  setFilter = (filter, queryValue, tagKey, tagValue) => {
    var queryFilters = this.state.filters;

    var multipleQueryFilters = this.state.filtersWithMultipleQueries;

    if(multipleQueryFilters.includes(filter,0)){
      var qValue = queryFilters[filter];
      if(qValue === undefined || qValue === null) qValue = '';

      if(!qValue.includes(queryValue)) qValue += " " + queryValue;
      qValue = qValue.trim();

      queryFilters[filter] = qValue;
    } else {
      queryFilters[filter] = queryValue;
    }

    this.setState({
      filters: queryFilters
    })

    this.addFilterTag(tagKey,tagValue,filter,queryValue);

    /* if (filter === "status") {
      let val = parameters["status"];
      if (val === undefined || val === null) val = "";
      if (!val.includes(queryValue)) val += " " + queryValue;
      val = val.trim();
      parameters["status"] = val;
      this.addFilterTag(tagKey, tagValue, filter, queryValue);
      this.setState({
        filters: parameters,
      });
    } else {
      parameters[filter] = queryValue;
      this.addFilterTag(tagKey, tagValue, filter, queryValue);
      this.setState({
        filters: parameters,
      });
    } */
  };

  removeFilter = (filter, queryValue) => {
    // remove a filter completely or erase a prop of it
   var queryFilters = this.state.filters;
    var multipleQueryFilters = this.state.filtersWithMultipleQueries;
    var qValue = queryValue || undefined;

    if(multipleQueryFilters.includes(filter)){
      if(queryFilters[filter] !== undefined && queryFilters[filter] !== null && qValue !== undefined){

        var qFilter = queryFilters[filter];
        var newQueryFilter = String(qFilter).replace(qValue, '');
        newQueryFilter = newQueryFilter.trim();
        queryFilters[filter] = newQueryFilter;
        if(queryFilters[filter] === '') {
          delete queryFilters[filter]; 
        } 
      }
    } else {
      if(queryFilters[filter] !== undefined && queryFilters[filter] !== null) {
        delete queryFilters[filter];
        // this.removeTag("",filter)
      }
    }
    this.setState({
      filters:queryFilters
    }) 
    var tagArray = this.state.tagArray;
        let obj = tagArray.find((x) => x.queryValue === queryValue);
        if(obj !== undefined){
          console.log("obj")
          let index = tagArray.indexOf(obj);
          tagArray.splice(index, 1);
          this.setState({ tagArray });
        }
    // this.removeTag("",filter)
    /* var prop = property || undefined;
    var params = this.state.filters;
    if (filterOrProp === "prop") {
      if (
        params[filter] !== undefined &&
        params[filter] !== null &&
        prop !== undefined
      ) {
        let parameter = params[filter];
        console.log("parameter", parameter)
        let newparameter = String(parameter).replace(prop, "");
        newparameter = newparameter.trim();
        console.log("new parameter", newparameter);
        params[filter] = newparameter;
        if (params[filter] === "") delete this.state.filters[filter];
        console.log(this.state.filters);
      }
    } else {
      if (params[filter] !== undefined && params[filter] !== null) {
        delete this.state.filters[filter];
        console.log(this.state.filters);
      }
    } */
  };

  removeTag = (key, queryKey) => {
    var tagArray = this.state.tagArray;
    console.log("tagarray", tagArray)
    var qKey = queryKey || undefined;
    let obj = tagArray.find((x) => x.key === key);
    console.log("object",obj)
    if(obj !== undefined){
      let index = tagArray.indexOf(obj);
      tagArray.splice(index, 1);
      this.setState({ tagArray });
      this.removeFilter(obj.queryKey, obj.queryValue);
    } 
    // if(qKey !== undefined) this.removeFilter(qKey);
    
    //  this.makeSearch();
  };

  removeAllFilters = () => {
    var filterObj = this.state.filters;
    filterObj = Object.fromEntries(
      Object.entries(filterObj).filter(([key]) => key === "q")
    ); // filter all  params except for "q" and convert the returned array back to object
    this.setState({
      tagArray: [],
      filters: filterObj,
    });
    console.log(this.state.filters);
  };

  componentDidUpdate() {
    
  }

  componentDidMount() {
    let params = this.getFiltersOnMount();
    var queryString = "";
    Object.entries(params).forEach(
      ([key, value]) => (queryString += `${key}=${value}&`)
    );
    if (queryString[queryString.length - 1] === "&")
      queryString = queryString.slice(0, queryString.length - 1);

    let query = `/search?${queryString}`;
    instanceAxs
      .get(query)
      .then((response) => {
        console.log("Search response", response);
        var minPrice = response.data.additional.minPrice;
        var maxPrice = response.data.additional.maxPrice;
        if (response.data.status) {
          var returnedItems = response.data.items;
          this.setState({
            items: returnedItems,
            resultCount: returnedItems.length,
            minAndMaxPrice: { minPrice: minPrice, maxPrice: maxPrice }
          });

          this.props.history.push(`/search?${queryString}`);
        } else {
          return console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="container-fluid searchResultPageContainer">
        <div className="searchFilterComponents">
          <button className="btn btn-primary" onClick={this.makeSearch}>
            Bruk Endringer
          </button>
          <button
            className="btn btn-primary "
            onClick={() => console.log(this.state.filters)}
          >
            Lagre Søk
          </button>
          <button className="btn btn-danger" onClick={this.removeAllFilters}>
            Fjerne Filtre
          </button>
          {this.state.minAndMaxPrice !== undefined && (
            <Price
              setfilter={this.setFilter}
              priceObject={this.state.minAndMaxPrice}
              priceState={{priceMin: this.state.filters["price_min"], priceMax: this.state.filters["price_max"]}}
            />
          )}
          <Status
            setfilter={this.setFilter}
            removeFilter={this.removeFilter}
            checkedState={(this.state.filters["status"])}
          ></Status>
        </div>
        <div className="searchResults">
          <div className="searchResults_Info">
            <div className="searchResults_Order ">
              <p style={{ margin: 0 }}>{this.state.resultCount} treff</p>

              <div>
                <select
                  className="form-control"
                  style={{ width: 200 }}
                  name="cars"
                  id="cars"
                  onChange={this.setSortingCategory}
                >
                  <option value="published">Publisert</option>
                  <option value="price_desc">Pris lav til høy</option>
                  <option value="price_asc">Pris høy til lav</option>
                </select>
              </div>
            </div>

            <div className="filterTagsContainer">
              {this.state.tagArray.map((tag) => {
                return <Tags tag={tag} removeTag={this.removeTag} />;
              })}
            </div>
          </div>
          <div className="searchResults_Items">
            {this.state.items.map((item, index) => {
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
}

Price.defaultProps = {
  priceObject: { minPrice: 0, maxPrice: 50 },
};
export default SearchResult;
