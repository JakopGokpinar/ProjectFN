import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
    let location = useLocation();

    return(
        <h1 style={{marginTop: 100}}>
            Sorry, { location.pathname } not found!
        </h1>
    )  
}
export default NotFound;