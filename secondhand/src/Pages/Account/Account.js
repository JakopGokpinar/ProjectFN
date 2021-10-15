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
                <div id="profile-category">
                    <Link to="/profile"><span className="bg-primary"><i className="far fa-user"></i>Profil</span></Link>
                    <Link to="/profile/innstillinger"><span className="bg-primary"><i className="fas fa-cog"></i>Innstillinger</span></Link>
                    <Link to="/profile/meldinger"><span className="bg-primary"><i className="fas fa-envelope"></i>Meldinger</span></Link>
                    <Link to="/profile/favoritter"><span className="bg-primary"><i className="fas fa-heart"></i>Favoritter</span></Link>
                    <Link to="/profile/mine-annonser"><span className="bg-primary"><i className="fas fa-bullhorn"></i>Mine Annonser</span></Link>
                    <Link to="/profile/lagradesok"><span className="bg-primary"><i className="fas fa-bookmark"></i>Lagrade Søk</span></Link>
                    <span className="bg-primary"><i className="fas fa-star-half-alt"></i>Vurderinger</span>
                </div>
            </div>
            <div className="right-prof-div">
                <Switch>
                    <Route exact path="/profile" component={Profile}></Route>
                    <Route path="/profile/favoritter" component={Favorites}></Route>
                    <Route path="/profile/innstillinger" component={Settings}></Route>
                    <Route path="/profile/meldinger" component={Chat}></Route>
                    <Route path="/profile/mine-annonser" component={MyAnnonces}></Route>
                    <Route path="/profile/lagradesok" component={SavedSearches}></Route>
                </Switch>
            </div>    
        </div>     
    )
}

export default Account;