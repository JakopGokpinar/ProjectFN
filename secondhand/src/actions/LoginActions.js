import { instanceAxs } from "../api/Api";
import { userApi } from "../config";

export const signIn = () => {
    return{
        type: "SIGN_IN"
    }
}

export const signOut = () => {
    return{
        type: "SIGN_OUT"
    }
}

export const saveUser = (user) => {
    return{
        type: "user/save",
        payload: user
    }
}

export const removeUser = () => {
    return{
        type: "user/remove"
    }
}

export const login = (user) => async (dispatch, getState) => {
    await instanceAxs.post(`${userApi}/login`, user)        
        .then(respond => {
            console.log(respond);

            if(respond.data.message === "user logged in"){
                dispatch(signIn());
                dispatch(saveUser(user));
            } else {
                alert("coul not login");
            }        
        })
        .catch(err => {
            console.log(err)
        })
}

export const logout = () => async (dispatch, getState) => {
    await instanceAxs.get(`${userApi}/logout`)
        .then(respond => {
            console.log(respond);
            dispatch(signOut());
            dispatch(removeUser());
        })
}



