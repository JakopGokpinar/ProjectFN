import React from 'react';
import ProductCard from '../../Component/ProductCard/ProductCard.js';
import data from '../../data/products.json';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            apiMsg: ''
        }
    }


    componentDidMount(){
        console.log(sessionStorage)
    }
    
    render(){
        return(
            <div className="container" id="menu-div">
                <div className="row">  
                    {data.map(data => {
                        return(
                            <div className="col-md-4 mb-4" key={data.name}>
                                <ProductCard 
                                    img={data.images} 
                                    price={data.price} 
                                    name={data.name} 
                                    location={data.location} 
                                    id={data.id}
                                    data={data}/>
                            </div>
                        ) 
                    })}                                                      
                </div>
                <p>{this.state.apiMsg}</p>
            </div>       
        )
    }   
}

export default Menu;