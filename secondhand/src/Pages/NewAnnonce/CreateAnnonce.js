import React, { useEffect, useState } from "react";
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import './CreateAnnonce.css';

import AnnonceRoute from "./AnnonceRoute";
import {car} from "./CarAnnonce";
import {property} from './PropertyAnnonce';

function CreateAnnonce() {

    let { path } = useRouteMatch();
    let history = useHistory();

    const categories = [
        property, car
    ]

    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState({title: '', desc: ''});
    const [currentSubs, setCurrentSubs] = useState([]);
    const [alert, setAlert] = useState('');

    useEffect(() => {
        if(category){
            setCurrentSubs(category.subs);
        }
    }, [category, subCategory])

    const changeCategory = (category) => {
        setCategory(category)
    }

    const changeSubCategory = (subcat) => {
        setSubCategory(subcat);
    }

    const checkForm = () => {
        if(category){
            history.push(path + `/ny/${category ? category.name : ''}`);
        } else {
            setAlert("Please select a category");
        }
    }
    
    return(
        <div>
            <Switch>
                <Route exact path={path}>
                        <div className="createAnnonceMainDiv">
                            <div className="chooseMainCategoryDiv">
                            { categories.map(cat => (
                                <button type="button" className="btn border border-secondary" name={cat.name} value={cat} onClick={() => changeCategory(cat)}>{cat.name}</button>
                            ))}
                        </div>
                        <div className="subCategoryDiv">
                            {currentSubs.length > 0 ? 
                                <select className="form-select" >
                                    <option defaultValue value="publishedNew">Choose a sub cat</option>
                                        {currentSubs.map(sub => (
                                            <option key={sub.title} value={sub.title} onClick={() => changeSubCategory(sub)}>{sub.title}</option>
                                        ))}         
                                </select>
                                :
                                <select className="form-select">
                                    <option defaultValue value="publishedNew">Choose a main cat</option>
                                </select>              
                            }
                        </div>
                        <button className="btn btn-primary" onClick={checkForm}>Lagre & Gå Videre</button>
                        <p>{alert}</p>
                    </div>
                </Route>
                <Route path={`${path}/ny/:categoryName`}>
                    <AnnonceRoute></AnnonceRoute>
                </Route>
            </Switch>
         </div>
    )
}

export default CreateAnnonce;