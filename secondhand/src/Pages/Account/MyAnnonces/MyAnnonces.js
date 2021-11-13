import { useEffect, useState} from 'react';
import { Switch, Route, Link, useRouteMatch } from 'react-router-dom';
import { instanceAxs } from '../../../api/Api';
import './MyAnnonces.css';

import AnnonceDetail from './AnnonceDetail';
import Annonce from './Annonce';
import { LoggedSelector } from '../../../reducers/LoginReducer';
import ProductCard from '../../../Component/ProductCard/ProductCard.js';

function MyAnnonces(){

    let { path,url } = useRouteMatch();
    const isLogged = LoggedSelector();
    const [annonces, setAnnonces] = useState();
    const [isLoading, setLoading] = useState(true);

    const img = [{link: "https://static.toiimg.com/photo/msid-58515713,width-96,height-65.cms"}];
    
    useEffect(() => {
        instanceAxs.get('/myannonces')
            .then(result => {
                if(result.data.message === "user's annonces"){
                    setAnnonces(result.data.annonces);
                    setLoading(false)
                } else {
                    console.log(result.data.message)
                }
            })
    }, [isLoading])

    return(
        <div>
            <Switch>
                <Route exact path={path}>
                    {isLogged ? 
                        <div>
                            { !isLoading ? 
                              <div>
                                <input type="text" className="form-control myAnnoncesSearchField" placeholder="Søk i Mine Annonser..."></input>
                                {annonces.map(annonce => {
                                    let ann = {...annonce, img: img, name: annonce.title, id:annonce._id}
                                    return(
                                        <div>
                                            <ProductCard annonce={ann}/>
                                        </div>
                                    )
                                })}
                              </div>
                                : 
                              <div>Loading</div>
                            }    
                        </div>
                      :
                        <p>Login</p>
                    }                
                </Route>
                <Route path={`${path}/:annonceId`}>
                    { !isLoading ? 
                        <div>
                         <AnnonceDetail annonces={annonces}/>
                        </div> 
                        : 
                        <div>Loading</div>
                    }
                </Route>
            </Switch>
        </div>
    )
    
    
}

export default MyAnnonces;

{/*<div key={annonce.annonceId}><Link to={`${url + '/' + annonce.annonceId}`}><Annonce annonce={annonce} /></Link>
</div>*/}