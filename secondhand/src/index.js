import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Pages/LoginAndRegister/Login.js';
import Register from './Pages/LoginAndRegister/Register.js';
import reportWebVitals from './reportWebVitals';
import Navbar from './Component/Navbar/Navbar.js';
import ProductPage from './Pages/ProductPage/ProductPage.js';
import Menu from './Pages/HomePage/Menu.js';
import SearchedResutPage from './Pages/SearchedResultPage/SearchedResultPage.js';
import Account from './Pages/Account/Account.js';
import NotFound from './Pages/NotFound.js';
import CreateAnnonce from './Pages/NewAnnonce/CreateAnnonce.js';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register}></Route>
        <Route>
          <div className="container">
              <Navbar></Navbar>
              <div className="top-margin">
                <Switch>
                  <Route exact path="/" component={Menu} />
                  <Route path="/search" component={SearchedResutPage}/>
                  <Route path="/profile" component={Account}></Route>
                  <Route path="/nyannonse" component={CreateAnnonce}></Route>
                  <Route exact path={`/product/:id`} component={ProductPage} />
                  <Route path="*" component={NotFound} />
                </Switch>
              </div>
          </div>
         </Route>
         <Route path="*" component={NotFound}></Route>
      </Switch>
    </div>
  </Router>
  ,document.getElementById('root') 
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
