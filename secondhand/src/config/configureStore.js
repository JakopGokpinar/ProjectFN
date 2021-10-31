import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import { rootReducer } from '../reducers/rootReducer'

const persistConfig = {
  //timeout: 2000,
  key: 'root',
  storage,
}

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  export const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

export const persistedState = loadState();
export const persistedReducer = persistReducer(persistConfig, rootReducer)

//export default () => {}