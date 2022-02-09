import React from 'react';
import './Account.css';

import { Switch, Route, Link } from 'react-router-dom';
import Profile from './Profile/Profile';
import Favorites from './Favorites/Favorites';
import Settings from '../Account/Settings/Settings';
import Chat from './Chat/Chat.js';
import MyAnnonces from './MyAnnonces/MyAnnonces.js';
import SavedSearches from './SavedSearches/SavedSearches';

const Account = () => {
    return(
        <div className="container prof-con border rounded">
            <div className="left-prof-div border-end">
                <div className="photo-and-name">
                    <img src="https://i.ytimg.com/vi/Ue1eHtvWRTU/maxresdefault.jpg" alt="" className="border border-1 border-secondary" id="profilePhotoSmall"></img>
                    <h6>Yilmaz Gokpinar</h6>
                </div>
                <div id="profil-category">
                    <Link to="/profil"><span className="bg-primary"><i className="far fa-user"></i>Profil</span></Link>
                    <Link to="/profil/innstillinger"><span className="bg-primary"><i className="fas fa-cog"></i>Innstillinger</span></Link>
                    <Link to="/profil/meldinger"><span className="bg-primary"><i className="fas fa-envelope"></i>Meldinger</span></Link>
                    <Link to="/profil/favoritter"><span className="bg-primary"><i className="fas fa-heart"></i>Favoritter</span></Link>
                    <Link to="/profil/mine-annonser"><span className="bg-primary"><i className="fas fa-bullhorn"></i>Mine Annonser</span></Link>
                    <Link to="/profil/lagradesok"><span className="bg-primary"><i className="fas fa-bookmark"></i>Lagrade Søk</span></Link>
                    <span className="bg-primary"><i className="fas fa-star-half-alt"></i>Vurderinger</span>
                </div>
            </div>
            <div className="right-prof-div">
                <Switch>
                    <Route exact path="/profil" component={Profile}></Route>
                    <Route path="/profil/favoritter" component={Favorites}></Route>
                    <Route path="/profil/innstillinger" component={Settings}></Route>
                    <Route path="/profil/meldinger" component={Chat}></Route>
                    <Route path="/profil/mine-annonser" component={MyAnnonces}></Route>
                    <Route path="/profil/lagradesok" component={SavedSearches}></Route>
                </Switch>
            </div>    
        </div>     
    )
}

export default Account;