import { instanceAxs } from "../api/Api";

export const signIn = () => {
    return{
        type: "SIGN_IN",
    }
}

export const signOut = () => {
    return{
        type: "SIGN_OUT"
    }
}

export const saveUser = (user) => {
    return{
        type: "user",
        payload: user
    }
}

export const login = (user) => async (dispatch, getState) => {
    const response = await instanceAxs.post('/login', user)        
    console.log(response);

    if(response.data.message === "user logged in"){
        dispatch(signIn());
    } else {
        alert("coul not login");
    }
}

export const logout = () => async (dispatch, getState) => {
    const response = await instanceAxs.get('/logout');
    console.log(response);

    dispatch(signOut());
}



