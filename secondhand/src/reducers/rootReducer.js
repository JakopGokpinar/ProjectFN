import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";
import userReducer from './userReducer.js';

export const rootReducer = combineReducers({
        isLogged: LoginReducer,
        user: userReducer
});
