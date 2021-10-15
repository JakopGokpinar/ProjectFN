import React, { useEffect, useState } from "react";

import './CreateAnnonce.css';

import { instanceAxs } from "../../api/Api";

function CreateAnnonce() {

    const [currentCategory, setCurrentCategory] = useState(undefined);
    const [currentSubs, setCurrentSubs] = useState([]);
    const [newAnnonce] = useState({annonceId: 100, title: "desk"})

    var house = {
        name: "Enebolig",
        id: 4325,
        subs: [
            {title : "kiralik", desc: "kiralik ev"},
            {title : "satilik", desc: "satilik ev"},
            {title : "komple", desc: "komple ev"},
        ]
    }
    var car = {
        name: "Bil",
        id: 9876,
        subs: [
            {title : "benzinli", desc: "benzinli araba"},
            {title : "dizel", desc: "dizel araba"},
        ]
    }
    const categories = [
        house, car
    ]

    useEffect(() => {
        if(currentCategory !== undefined){
            setCurrentSubs(currentCategory.subs);
        }
    }, [currentCategory])

    const changeCategory = (event) => {
        var categ = event.target.name;
        if(categ === "Enebolig"){
            setCurrentCategory(house);
            setCurrentSubs(currentCategory.subs)
        } else if(categ === "Bil") {
            setCurrentCategory(car)
        }
    }

    const create = () => {
        instanceAxs.post('/newannonce', newAnnonce)
            .then(result => {
                console.log(result)
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    return(
        <div className="createAnnonceMainDiv">
            <div className="chooseMainCategoryDiv">
                { categories.map(cat => (
                    <button type="button" className="btn border border-secondary" name={cat.name} value={cat} onClick={changeCategory}>{cat.name}</button>
                ))}
            </div>
            <div className="subCategoryDiv">
                <select className="form-select" id="sortby-menu" style={{width: "200px"}}>
                    {currentSubs.length > 0 ? 
                        <div>
                            <option defaultValue value="publishedNew">Choose a sub cat</option>
                            {currentSubs.map(sub => (
                                <option value="">{sub.title}</option>
                            ))}
                        </div>
                            :
                        <option defaultValue value="publishedNew">Choose a main cat</option>
                    }
                </select>              
            </div>
            <button className="btn btn-primary" onClick={create}>Choose</button>
         </div>
    )
    
}

export default CreateAnnonce;