import React, { useEffect, useState } from "react";
import "./SearchResult.css";
import ProductCard from "../../Component/ProductCard/ProductCard.js";
import { instanceAxs } from "../../config/api";
import { useSearchParams } from "react-router-dom";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Filters from "./Filters";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import FilterBadge from "./FilterBadge";
import { useSelector } from "react-redux";

const SearchResult = () => {

  const user = useSelector(state => state.user.user);
  const [counties, setCounties] = useState([])
  const [searchParams, setSearchParams] = useSearchParams();  
  const [productArray, setProductArray] = useState([])
  const [resultNumber, setResultNumber] = useState(0);
  const [categories, setCategories] = useState('')

  const handleFilterChange = (key, value) => {
    const params = searchParams;
    if(key!== 'kommune') {
      params.delete(key);
    }
    params.append(key, value);
    setSearchParams(params)
  }

  const removeSelectedFilter = (key, value) => {
    const params = searchParams;
    if(key === 'fylke'){
      params.delete(key);
      params.delete('kommune')
    } else if(key === 'kommune') {
      let kommuneArr = [];
      for(const [queryKey, queryValue] of params.entries()){
        if(queryKey === 'kommune' && queryValue !== value) {
          kommuneArr.push(queryValue);
        }
      }
      params.delete('kommune');
      kommuneArr.map(item => params.append('kommune', item))
    }else {
      params.delete(key)
    }
    setSearchParams(params)
  }

  const resetFilters = (e) => {
    e.preventDefault();
    var params = searchParams;
    for (const [key] of Array.from(searchParams.entries())) {
      if(key !== 'q') params.delete(key)
    }
    setSearchParams(params)
  }

/*   const handleSortingChange = (e) => {
    let value = e.target.value;
    var products = productArray;

    switch(value){
      case "price_desc":
        console.log(products)
      products[0].sort((a,b) => a.price - b.price);
      setProductArray(products);
      break;
      case "price_asc":
        console.log(value)

        let priceAscArray = [].concat(products)
        .sort((a, b) => a.price < b.price ? 1 : -1)
          setProductArray(priceAscArray)
        break;
    }
   if(value === "price_desc") {
      finalArray[0].sort((a, b) => a.price - b.price);

    } else if(value === "price_asc") {
      
    } else if(value === "published-last") {
      let publishArray = [].concat(finalArray)
    .sort((a, b) => a.date < b.date ? 1 : -1)
      finalArray = publishArray;
    } else if(value === "published-first") {
      let publishArray = [].concat(finalArray)
    .sort((a, b) => a.date > b.date ? 1 : -1)
      finalArray = publishArray;
    } 

    setProductArray(finalArray)
  }; */

  const handleSorting = (e) => {
    e.preventDefault();
    let value = e.target.value;
    var products = productArray;

    switch(value){
      case "price_asc":
        products.sort((a,b) => a.price - b.price);
        break;
      case "price_desc":  
        products.sort((a,b) => b.price - a.price);
        break;
      case "published-first":
        products.sort((a, b) => a.date - b.date);
        break;
      case "published-last":
        products.sort((a, b) => b.date - a.date);
        break;
      default:
        break;
    }
    setProductArray(products)
  }

  const createQueryObject = () => {
    var queryObject = {};
    let kommuneArr = [];

    for(const [key, value] of searchParams.entries()) {
      if(key === 'kommune') {
        kommuneArr.push(value)
        queryObject["kommune"] = kommuneArr;
      } else {
        queryObject[key] = value
      }
    }
    return queryObject;
  }

  const searchAlgorithm = () => {
    let queryObject = createQueryObject(); 
    instanceAxs.post('/searchproduct', queryObject).then((response) => {
        if (response.error !== null) {
          const products = response.data.productArray;
          setProductArray(products);
          setCategories({categories: response.data.categories, subCategories: response.data.subCategories})
          setResultNumber(products.length)
          return;
        } 
        console.log(response.data.message)       
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  useEffect(() => {
    searchAlgorithm();  
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, user])

  useEffect(() => {
    fetch('https://ws.geonorge.no/kommuneinfo/v1/fylkerkommuner', {
        method: 'GET'
      }).then((response) => response.json())
      .then((data) => {
        setCounties(data) 
      });       
},[])

    return (
          <Container fluid className="searchresult-container">
            <Row  className="result-row">
                  <Col lg={3}  className="filters-column">
                        <Button variant="outline-danger" className="w-100 mb-4" onClick={resetFilters}>Reset Filters</Button>
                        <Filters 
                          handleFilterChange={handleFilterChange} 
                          removeSelectedFilter={removeSelectedFilter} 
                          searchParams={searchParams} 
                          counties={counties.length > 0 && counties}
                          categories={categories !== '' && categories}>
                          </Filters>
                  </Col>

                <Col className="products-column" lg={8}>

                    <div className="top-row">
                      <p>{resultNumber} treff</p>
                      <Form.Select style={{maxWidth: 200}} onChange={handleSorting}>
                        <option value="mest-relevant">Mest Relevant</option>
                        <option value="puslished-first">Eldste først</option>
                        <option value="published-last">Nyeste først</option>
                        <option value="price_asc">Pris lav til høy</option>
                        <option value="price_desc">Pris høy til lav</option>
                      </Form.Select>
                    </div>

                    <div className="middle-row">
                        <FilterBadge searchParams={searchParams} removeSelectedFilter={removeSelectedFilter} counties={counties.length > 0 && counties}></FilterBadge>
                    </div>

                      <div className="bottom-row">
                        {productArray.length > 0 && productArray.map((product, index) => {
                          return(
                            <div key={index} style={{marginBottom: 20}}>
                                 <ProductCard                                        
                                        key={product.title}
                                        images={product.annonceImages}
                                        title={product.title}
                                        price={product.price}
                                        id={product._id}
                                        location={product.location}
                                        isFavorite={product.isFavorite}
                                        ></ProductCard>
                              </div>
                          )
                        })}
                      </div>
                  </Col>
            </Row>
          </Container>
    );
  
}

export default SearchResult;
