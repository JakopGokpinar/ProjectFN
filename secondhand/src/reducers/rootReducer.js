import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import userReducer from './userReducer.js';
import SearchReducer from "./SearchReducer";

export const rootReducer = combineReducers({
        isLogged: LoginReducer,
        user: userReducer,
        filters: SearchReducer
});
