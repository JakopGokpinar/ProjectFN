import "./Favorites.css";
import ProductCard from "../../../Component/ProductCard/ProductCard";
import { instanceAxs } from "../../../config/api";
import React, { useEffect, useState } from "react";
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useSelector } from "react-redux";

const Favorites = () => {

    const user = useSelector(state => state.user.user);
    const [favoritesArray, setFavoritesArray] = useState(user.favorites)

    useEffect(() => {
        instanceAxs.get('/favorites/get').then(response => {
            const productArray = response.data.productArray;
            if(productArray) {
                setFavoritesArray(productArray)
                return;
            }
           console.log(response.data.message);
        }).catch(error => {
            console.log("error happened while fetching Favorites", error)
        })
    }, [user])
    
        return(
            <div className="favorites-container">
                <Breadcrumb>
                    <Breadcrumb.Item href='/profil'>My profile</Breadcrumb.Item>
                    <Breadcrumb.Item href='/profile' active>Profile</Breadcrumb.Item>
                </Breadcrumb>
                <div className="favorites-content">
                {(favoritesArray && favoritesArray.length > 0) ? favoritesArray.map(product => {
                            return(
                                <div className="favorites-product" key={product.title}>
                                        <ProductCard
                                            images={product.annonceImages}
                                            title={product.title}
                                            price={product.price}
                                            id={product._id}
                                            location={product.location}
                                            isFavorite={product.isFavorite}
                                        ></ProductCard>
                                </div>
                            )
                        }) : <p>No Content</p>}
                </div>
            </div>
        )
    
}

export default Favorites;