import React from 'react';
import ProductCard from '../../Component/ProductCard/ProductCard.js';
import { instanceAxs } from '../../api/Api.js';
import { fileApi } from '../../config/index.js';
import "./Menu.css";

class Menu extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoading: true
        }
    }

     async getItems () {
        await instanceAxs.get(`${fileApi}/getmenuitems?category=cars`)
        .then(response => {
            console.log("Retrived items: ", response.data.items);
            var returnedItems = response.data.items;
            var itemArray = [];
            for(let i = 0; i<returnedItems.length; i++){
                returnedItems[i].shift();
                var dbArray = returnedItems[i]
                for(let k = 0; k<dbArray.length; k++){
                    dbArray[k].pop();
                    var collectionArray = dbArray[k];
                console.log("col ar",collectionArray)
                    collectionArray.map(arr => itemArray.push(arr))
                }
            }
            console.log(itemArray)
            
            this.setState({
                items: itemArray,
                isLoading: false
            })
        })
    }
    
    componentDidMount(){
        this.getItems();
    }
    
    render(){
        return(
            <div className="container HomePageContainer">
                <div className="homePageItems">  
                    { (this.state.items.length > 0 && this.state.isLoading === false) ? 
                    
                    (this.state.items.map(item => {
                        var annonce = item;
                        return(
                                <div key={annonce._id}>
                                    <ProductCard 
                                    img={annonce.images} 
                                    price={annonce.price} 
                                    name={annonce.title} 
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
        )
    }   
}

export default Menu;