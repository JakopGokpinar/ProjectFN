import React from "react";

import { instanceAxs } from "../../api/Api";


class CarAnnonce extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            category: 'bil',
            subCategory: this.props.subCategory,
            title: '',
            description: '',
            price: 0,
            properties: {
                carPlate : '',
                modelYear: 0,
            }
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value,
        })
    }

    handlePropertyChange = (e) => {
        let target = e.target.id
        this.setState(prevState => ({
            properties: {
                ...prevState.properties,
                [target]: e.target.value
            }
        })
                
        )
    }

    submit = (e) => {
        e.preventDefault();

        var newAnnonce = {
            ...this.state
        }

        instanceAxs.post('/newannonce', newAnnonce)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
            console.log(this.state)
    }

    render() {
        return(
            <div>
                <form className="" onSubmit={this.submit}>
                    <label className="form-label">Tittelen</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="title" aria-describedby="title" onChange={this.handleChange}/>
                    </div>
                    <label htmlFor="description" className="form-label">Beskrivelse</label>
                    <div className="input-group mb-3">
                        <textarea className="form-control" id="description" rows="3" onChange={this.handleChange}/>
                    </div>
                    <label htmlFor="price" className="form-label">Pris</label>
                    <div className="input-group mb-5">
                        <span className="input-group-text">Nok</span>
                        <input type="number" className="form-control" id="price" placeholder="0" onChange={this.handleChange}></input>
                        <input type="number" className="form-control" id="price" placeholder=".00"></input>
                    </div>
                    <label htmlFor="carPlate" className="form-label">Car Plate</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="carPlate" aria-describedby="carPlate" onChange={this.handlePropertyChange}/>
                    </div>
                    <label htmlFor="modelYear" className="form-label">Model Year</label>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" id="modelYear" aria-describedby="modelYear" onChange={this.handlePropertyChange}/>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Publiser</button>                  
                </form>
            </div>
        )
    }
}

export const car = {
    name: "bil",
    id: 9876,
    subs: [
        {title : "benzinli", desc: "benzinli araba"},
        {title : "dizel", desc: "dizel araba"},
        {title : "hybrid", desc: "dizel araba"},
    ],
    component: <CarAnnonce/>
}

export default CarAnnonce;