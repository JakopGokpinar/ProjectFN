import { persistReducer } from 'redux-persist'
 import localStorage from 'redux-persist/es/storage';
import { combineReducers } from 'redux';
import LoginReducer from '../reducers/LoginReducer';
import userReducer from '../reducers/userReducer';
import SearchReducer from '../reducers/SearchReducer';

const persistConfig = {
  key: 'root',
  storage: localStorage,
}

const rootReducer = combineReducers({ 
  isLogged: LoginReducer,
  user: userReducer,
  //  filters: persistReducer(sessionConfig, SearchReducer)
  filters: SearchReducer
}); 

export const loadState = () => {
  try {
    const localState = localStorage.getItem('state');
    
    if (localState=== null) {
      console.log("local state is undefined")
      return undefined;
    } 
    return JSON.parse(JSON.stringify(localState));
  } catch(err) {
    console.log(err); 
    return undefined;
  }
}
  
export const saveState = (state) => {
    try {
      var stateData = JSON.stringify(state);
      localStorage.setItem("state",stateData)
    } catch (err) {
      console.log(err);
    }
};

export const persistedState = loadState();
export const persistedReducer = persistReducer(persistConfig, rootReducer)
