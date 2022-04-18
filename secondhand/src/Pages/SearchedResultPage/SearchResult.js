import React from "react";
import "./SearchResult.css";
import ProductCard from "../../Component/ProductCard/ProductCard.js";
import { instanceAxs } from "../../api/Api";
import Date from "./FilterComponents/Date";
import Price from "./FilterComponents/Price";
import Status from "./FilterComponents/Status";
import Tags from "./FilterComponents/Tags.js";
import PrimarySelect from "./ComponentSelect/PrimarySelect";
import CategorySelector from "./FilterComponents/CategorySelecter";

class SearchResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filtersWithMultipleQueries: ["status", "location"],
      resultCount: 0,
      tagArray: [],
      urlParams: new URLSearchParams(props.location.search),
      filters: [
        {
          queryKey: "q",
          queryValue: new URLSearchParams(props.location.search).get("q"),
        }
      ],
      minAndMaxPrice: undefined,
    };
  }

  setSortingCategory = (value) => {
    var queryFilters = this.state.filters;
    var hasOrderFilter = queryFilters.find(e => e.queryKey === "order");
    var index = queryFilters.indexOf(hasOrderFilter);

    if(index !== -1) {
      hasOrderFilter["queryValue"] = value;
      queryFilters[index] = hasOrderFilter;
    } else {
      var orderFilter = {
        queryKey: "order",
        queryValue: value
      }
      queryFilters.push(orderFilter);
    }

    this.setState({
      filters: queryFilters
    });
    this.makeSearch()
    /* var sorting = e.target.value;
    this.setFilter("order", sorting, sorting); */
  };

  getFiltersOnMount = () => {
    let urlParams = new URLSearchParams(window.location.search)

    var params = [];
    for (const [key, value] of urlParams) {
      var filter = {};

      switch(key){
        case 'q':
          filter = {
            queryKey: key,
            queryValue: value,
            tagKey: undefined,
            tagValue: undefined,
          };
          params.push(filter)
          break;
        case 'order':
          filter = {
            queryKey: key,
            queryValue: value
          }
          params.push(filter);
          break;
        case 'price_max':
          filter = {
            queryKey: key,
            queryValue: value,
            tagKey: "maxPrice",
            tagValue: `til ${value}`,
          };
          params.push(filter);
          break;
        case 'price_min':
          filter = {
            queryKey: key,
            queryValue: value,
            tagKey: "minPrice",
            tagValue: `fra ${value}`,
          };
          params.push(filter);
          break;
        case 'status':
          if(value === "new") {
            filter = {
              queryKey: key,
              queryValue: value,
              tagKey: "statusNew",
              tagValue: "Nytt",
            };
          } else if(value === "used") {
            filter = {
              queryKey: key,
              queryValue: value,
              tagKey: "statusUsed",
              tagValue: "Brukt",
            };
          }
          
          params.push(filter);
          break;
      }
    }
    this.setState({
      filters: params
    });
    return params;
  };

  getTags = (queryFilters) => {
    var filters = queryFilters === undefined ? this.state.filters : queryFilters;
    var tags = [];

    for (const filter of filters) {
      if (filter.tagKey !== undefined) {
        var tag = {
          key: filter.tagKey,
          value: filter.tagValue,
          queryKey: filter.queryKey,
          queryValue: filter.queryValue,
        };
        tags.push(tag);
      }
    }
    this.setState({
      tagArray: tags,
    });
    return tags;
  };

  makeSearch = () => {
    let filters = this.state.filters;
    var queryString = "";
    for (const filter of filters) {
      queryString += `${filter.queryKey}=${filter.queryValue}&`;
    }
    /* Object.entries(filters).forEach(
      ([key, value]) => (queryString += `${key}=${value}&`)
    ); */
    if (queryString[queryString.length - 1] === "&")
      queryString = queryString.slice(0, queryString.length - 1);
    let query = `/search?${queryString}`;
    instanceAxs
      .get(query)
      .then((response) => {
        // console.log("Search response", response);
        if (response.data.status) {
          var returnedItems = response.data.items;
          this.setState({
            items: returnedItems,
            resultCount: returnedItems.length,
          });
          window.history.pushState("page2", "seach made", query);
          // this.getFiltersOnMount();
          // window.location.href =  query
        } else {
          return console.log(response.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  setFilter = (queryKey, queryValue, tagKey, tagValue) => {
    var queryFilters = this.state.filters;
    var multipleQueryFilters = this.state.filtersWithMultipleQueries;
    var filter = queryFilters.find((element) => element.tagKey === tagKey);
    var index = queryFilters.indexOf(filter);

    if (queryValue === '') {
      if(index !== -1){
        queryFilters.splice(index,1)
        this.setState({
          filters: queryFilters
        });
        this.removeTag(tagKey, queryKey)
      }
      return;
    }

    if (index === -1) {
      var newFilter = {
        queryKey: queryKey,
        queryValue: queryValue,
        tagKey: tagKey,
        tagValue: tagValue,
      };

      queryFilters.push(newFilter);

      this.setState({
        filters: queryFilters,
      });
      this.addFilterTag(tagKey,tagValue,queryKey, queryValue);
      return;
    }

    if (multipleQueryFilters.includes(queryKey, 0)) {
      var qValue = filter.queryValue;
      if (qValue === undefined || qValue === null) qValue = "";

      if (!qValue.includes(queryValue)) qValue += " " + queryValue;
      qValue = qValue.trim();

      filter.queryValue = qValue;
      queryFilters[index] = filter;
      this.addFilterTag(tagKey, tagValue, filter, qValue)
    } else {
      filter.queryValue = queryValue;
      filter.tagValue = tagValue;
      queryFilters[index] = filter;
      this.addFilterTag(tagKey, tagValue, filter, queryValue)
    }
    this.setState({
      filters: queryFilters,
    });
  };

  addFilterTag = (key, value, queryKey, queryValue) => {
    let tagArr = this.state.tagArray;
    var tagObj = {};
    var object = tagArr.find((obj) => obj.key === key);
    var objIndex = tagArr.indexOf(object);

    if (objIndex !== -1) {
      tagObj = {
        key,
        value: value,
        queryKey,
        queryValue: queryValue,
      };
      tagArr[objIndex] = tagObj;
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
  };

  removeTag = (key, queryKey) => {
    var tagArray = this.state.tagArray;
    let obj = tagArray.find((x) => x.key === key);
    if(obj !== undefined){
      let index = tagArray.indexOf(obj);
      tagArray.splice(index, 1);
      this.setState({ tagArray });
    } 
  };

  removeAllFilters = () => {
    var filterObj = this.state.filters;
    var filterArr = [];

    for(const filter of filterObj) {    // remove all filters except for 'q'
      if(filter.queryKey !== 'q') break;
      filterArr.push(filter)
    }

    this.setState({
      tagArray: [],
      filters: filterArr,
    });
  };

  componentDidMount() {
    let params = this.getFiltersOnMount();
    this.getTags(params);
    var queryString = "";
    for (const filter of params) {
      queryString += `${filter.queryKey}=${filter.queryValue}&`;
    }
    if (queryString[queryString.length - 1] === "&")
      queryString = queryString.slice(0, queryString.length - 1);

    // let query = `/search?${queryString}`;
    let query = '/file/getmenuitems'
    instanceAxs
      .get(query)
      .then((response) => {
        console.log("Search response", response);
        var minPrice = 0 //response.data.additional.minPrice;
        var maxPrice = 10000 //response.data.additional.maxPrice;
        if (response.status === 200) {
          var returnedItems = response.data.items;
          var categoryArray = response.data.categories;
          this.setState({
            items: returnedItems,
            resultCount: 10, //returnedItems.length,
            minAndMaxPrice: { minPrice: minPrice, maxPrice: maxPrice },
            categoryArray
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
          <CategorySelector
            setfilter={this.setFilter}
            
            categoryState={this.state.categoryArray !== null &&this.state.categoryArray}
          ></CategorySelector>
          {this.state.minAndMaxPrice !== undefined && (
            <Price
              setfilter={this.setFilter}
              priceObject={this.state.minAndMaxPrice}
              minPriceState={this.state.tagArray.find(e => e.key === "minPrice")}
              maxPriceState={this.state.tagArray.find(e => e.key === "maxPrice")}
            />
          )}
          <Status
            setfilter={this.setFilter}
            statusNewState={this.state.filters.find(e => e.tagKey === "statusNew")}
            statusUsedState={this.state.filters.find(e => e.tagKey === "statusUsed")}
          ></Status>
          <Date
            setfilter={this.setFilter}
            state={this.state.filters.find(e => e.queryKey === "published")}
          ></Date>
        </div>
        <div className="searchResults">
          <div className="searchResults_Info">
            <div className="searchResults_Order ">
              <p style={{ margin: 0 }}>{this.state.resultCount} treff</p>

              <PrimarySelect 
                setSortingCategory={this.setSortingCategory}
                  selectedOption={this.state.filters.find(e => e.queryKey === "order")}>
              </PrimarySelect>

            </div>

            <div className="filterTagsContainer">
              {this.state.tagArray.map((tag) => {
                return <Tags tag={tag} setfilter={this.setFilter} />;
              })}
            </div>
          </div>
          <div className="searchResults_Items">
            {this.state.items.map((item, index) => {
              item.annonce = item
              return (
                <>
                  <div className="itemCol" key={item.annonce._id}>
                    <ProductCard                
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
