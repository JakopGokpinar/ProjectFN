import React from 'react';
import './MyAnnonces.css';
import { instanceAxs } from '../../../config/api.js'
import ProductCard from '../../../Component/ProductCard/ProductCard.js';

class MyAnnonces extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            productArray: [],
            isLoading: true
        }
    }

    getAnnonces = () => {
        instanceAxs.get('/userannonces').then(response => {
            console.log(response)
            const message = response.data.message;
            const productArray = response.data.productArray;

            if(message === 'Products found') {
                return this.setState({ productArray, isLoading: false })
            }
            console.log(message)
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getAnnonces();
    }


    render() {
        return(
            <div>
                {!this.state.isLoading ? 
                <div>
                    {this.state.productArray.map(item => {
                        return(
                            <div id={item._id}>
                                <ProductCard 
                                    img={item.annonceImages}
                                    price={item.price}
                                    name={item.name}
                                    location={item.location}
                                    id={item._id}/>
                            </div>
                        )
                    })}
                </div>
                :
                <div>
                    Loading
                </div>
                }
            </div>
        )
    }
}

export default MyAnnonces;