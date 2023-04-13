import React from 'react';
import { useLocation } from 'react-router-dom';
import '../main.css';

const NotFound = () => {
    let location = useLocation();

    return(
        <div className='page-container'>
            <h3 className='ms-5'>
                Sorry! { location.pathname } not found!
            </h3>
        </div>
    )  
}
export default NotFound;