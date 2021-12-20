import React from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
    let location = useLocation();

    return(
        <h3 className='ms-5'>
            Sorry! { location.pathname } not found!
        </h3>
    )  
}
export default NotFound;