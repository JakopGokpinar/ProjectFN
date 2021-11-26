import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

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
import Redux from './redux/redux.js';
import Spinner from './Component/Spinner/Spinner.js';
import { persistedReducer, persistedState, saveState} from './config/configureStore.js';
//import { rootReducer } from './reducers/rootReducer.js';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
);

let store = createStore(persistedReducer, persistedState, composedEnhancer);
let persistor = persistStore(store);

//const store = createStore(rootReducer, composedEnhancer);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
      <Router>
        <div>
          <Switch>
            
            <Route>
              <div className="container">
                  <Navbar></Navbar>
                  <div className="top-margin">
                    <Switch>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/register" component={Register}></Route>
                      <Route exact path="/" component={Menu} />
                      <Route path="/search" component={SearchedResutPage}/>
                      <Route path="/profile" component={Account}></Route>
                      <Route path="/nyannonse" component={CreateAnnonce}></Route>
                      <Route exact path={`/product/:annonceId`} component={ProductPage} />
                      <Route path="/redux" component={Redux}/>
                      <Route path="*" component={NotFound} />
                    </Switch>
                  </div>
              </div>
            </Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
  </Provider>
  ,document.getElementById('root') 
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();