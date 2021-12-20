import React from 'react';
import ProductCard from '../../Component/ProductCard/ProductCard.js';
import { instanceAxs } from '../../api/Api.js';
import { fileApi } from '../../config/index.js';

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoading: true
        }
    }

     async getItems () {
        await instanceAxs.get(`${fileApi}/getmenuitems`)
        .then(response => {
            console.log(response);
            this.setState({
                items: response.data.items,
                isLoading: false
            })

        })
        console.log("items", this.state.items)
    }
    componentDidMount(){
        this.getItems();
    }
    
    render(){
        return(
            <div className="container" id="menu-div">
                <div className="row">  
                    { (this.state.items.length > 0 && this.state.isLoading === false) ? 
                    
                    (this.state.items.map(item => {
                        var annonce = item.annonce;
                        return(
                            <div className="col-md-4 mb-4" key={annonce.title}>
                                <ProductCard 
                                    img={annonce.images} 
                                    price={annonce.price} 
                                    name={annonce.title} 
                                    location="bergen"
                                    id={annonce._id}/>                           
                            </div>
                        ) 
                    }))
                    : 
                    <p>loading</p>
                }                                                      
                </div>
            </div>       
        )
    }   
}

export default Menu;