import "./Favorites.css";
import { Switch, Route } from "react-router";
import NavbarList from "./NavbarList";
import NavbarProduct from "./NavbarProduct";
import List from "./List";
import ListProdukt from "./ListProduct";

function Favorites() {
    return(
        <div className="favorites">       
            <Switch>
                <Route exact path="/profile/favoritter">
                    <NavbarList></NavbarList>
                    <hr className="line"/>
                    <div className="favorites__lists">
                        <List link="/profile/favoritter/mine-funn"></List>
                        <List link="/profile/favoritter/mine-funn-2"></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                        <List></List>
                    </div>
                </Route>
                <Route path="/profile/favoritter/:favListId">
                    <NavbarProduct/>
                    <hr className="line"/>
                    <div className="favoriteList__products">
                        <ListProdukt></ListProdukt>
                        <ListProdukt></ListProdukt>
                        <ListProdukt></ListProdukt>
                        <ListProdukt></ListProdukt>
                    </div>
                </Route>
            </Switch>
        </div>
    )
}

export default Favorites;