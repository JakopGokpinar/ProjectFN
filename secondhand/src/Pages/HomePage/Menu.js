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

    callApi(){
        fetch("http://localhost:9000/testServer")
        .then(res => res.text())
        .then(res => this.setState({ apiMsg: res}))
    }

    componentDidMount(){
        this.callApi();
    }
    render(){
        return(
            <div class="container" id="menu-div">
                <div class="row">  
                    {data.map(data => {
                        return(
                            <div class="col-md-4 mb-4" key={data.name}>
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