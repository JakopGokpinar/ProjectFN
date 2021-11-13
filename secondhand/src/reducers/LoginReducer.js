import { useSelector } from "react-redux";

const LoginReducer = (state = false, action) => {
    switch (action.type) {
        case "SIGN_IN":          
            return true;            
        case "SIGN_OUT":
            return false;
        default:
            return state;
    }
}

export function LoggedSelector(){
    return useSelector(state => state.isLogged);
}

export function UserSelector(){
    return useSelector(state => state.user)
}

export default LoginReducer;