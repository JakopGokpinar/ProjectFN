import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './Component/Navbar/Navbar';
import Menu from './Pages/HomePage/Menu';
import Login from './Pages/LoginAndRegister/Login';
import Register from './Pages/LoginAndRegister/Register';
import ProductPage from './Pages/ProductPage/ProductPage';
import SearchResult from './Pages/SearchedResultPage/SearchResult';
import Account from './Pages/Account/Account';
import NotFound from './Pages/NotFound';
import CreateAnnonce from './Pages/CreateAnnonce/CreateAnnonce';

class App extends Component {

  render() {
    return (
     <Router>
       <Switch>
         <Route exact path='/login' component={Login}/>
         <Route exact path="/register" component={Register}></Route>
          <Route>
            <div style={{marginBottom: 100}}>
              <Navbar></Navbar>
            </div>
            <Switch>
              <Route exact path='/' component={Menu}/>
              <Route path='/profil' component={Account}/>
              <Route path='/nyannonse' component={CreateAnnonce}/>
              <Route path='/search' component={SearchResult}/>
              <Route path='/profil' component={Account}/>
              <Route path={'/produkt/:annonceId'} component={ProductPage}/>
              <Route path="*" component={NotFound}/>
            </Switch>            
          </Route>
       </Switch>
     </Router>
    );
  }
}

export default App;
