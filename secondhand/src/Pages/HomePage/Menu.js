import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProductCard from '../../Component/ProductCard/ProductCard.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { instanceAxs } from '../../config/api.js';
import "./Menu.css";
import { useSelector } from 'react-redux';

const Menu = () => {

    const user = useSelector(state => state.user.user);
    const [productArray, setProductArray] = useState([])

    const receiveProducts = () => {
        instanceAxs.get('/search').then(response => {
            const products = response.data.productArray;
            const rows = [...Array( Math.ceil(products.length / 4) )];
            const productRows = rows.map( (row, idx) => products.slice(idx * 4, idx * 4 + 4) ); 
            setProductArray(productRows)
        })
    }
    
    useEffect(() => {
        receiveProducts()
    }, [user])
    
        return(
            <Container fluid className='mainmenu-container'>
                {productArray.length > 0 && productArray.map((row, index) => {
                    return(             
                        <Row key={index} className="product-row">
                        {row.map((product, index) => {
                            return(
                                    <Col key={index} className="product-column">
                                        <ProductCard
                                        key={product.title}
                                        images={product.annonceImages}
                                        title={product.title}
                                        price={product.price}
                                        id={product._id}
                                        location={product.location}
                                        isFavorite={product.isFavorite}
                                        ></ProductCard>
                                </Col>
                            )
                        })}
                    </Row>                 
                    )
                })               
                }
            </Container>
        )
    }   


export default Menu;


/*
            <div className="container HomePageContainer">
                <div className="homePageItems">  
                    { (isLoading === false) ? 
                    
                    (productArray.map(item => {
                        var annonce = item;
                        return(
                                <div key={annonce._id}>
                                    <ProductCard 
                                        images={annonce.annonceImages} 
                                        price={annonce.price} 
                                        title={annonce.title} 
                                        id={annonce._id}
                                        location={annonce.location}/> 
                                </div>                          
                        ) 
                    }))
                    : 
                    <p>loading</p>
                }                                                      
                </div>
            </div>    
*/