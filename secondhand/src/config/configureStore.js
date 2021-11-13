import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import storageSession from 'redux-persist/lib/storage/session';
import localStorage from 'redux-persist/es/storage';

import { rootReducer } from '../reducers/rootReducer'

const persistConfig = {
  //timeout: 2000,
  key: 'root',
  storage: localStorage
}

const loadState = () => {
    try {
      const serializedState = window.localStorage.getItem('state');
      
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      console.log(err);
      return undefined;
    }
};
  
export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      window.localStorage.setItem('state', serializedState);
    } catch (err) {
      console.log(err);
    }
};

export const persistedState = loadState();
export const persistedReducer = persistReducer(persistConfig, rootReducer)
