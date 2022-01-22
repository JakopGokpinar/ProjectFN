import { combineReducers } from "redux";
import {persistReducer} from "redux-persist";
import { sessionConfig } from "../config/store-config";
import LoginReducer from "./LoginReducer";
import userReducer from './userReducer.js';
import SearchReducer from "./SearchReducer";

export const rootReducer = combineReducers({
        isLogged: LoginReducer,
        user: userReducer,
        filters: persistReducer(sessionConfig, SearchReducer)
});
