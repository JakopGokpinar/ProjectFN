import { combineReducers } from "redux";
import LoginReducer from "./LoginReducer";

export const combinedReducer = combineReducers({
        isLogged: LoginReducer
});
