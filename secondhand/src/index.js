import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore } from 'redux-persist';

import reportWebVitals from './reportWebVitals';
import { persistedReducer, persistedState, saveState} from './config/store-config.js';
import App from './App.js';

const composedEnhancer = composeWithDevTools(
  applyMiddleware(thunk)
);
let store = createStore(persistedReducer, persistedState, composedEnhancer);
persistStore(store);

store.subscribe(() => {
  saveState(store.getState());
});

ReactDOM.render(
  <Provider store={store}>
     <App></App>
  </Provider>
  ,document.getElementById('root') 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

//eslint-disable-next-line
 {/* <Router>
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
                      <Route path="*" component={NotFound} />
                    </Switch>
                  </div>
              </div>
            </Route>
            <Route path="*" component={NotFound}></Route>
          </Switch>
        </div>
      </Router> */}
