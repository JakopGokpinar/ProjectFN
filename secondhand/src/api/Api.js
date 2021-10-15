import axios from 'axios';

import { serverApi } from '../config/cfg.js';

var isLoggedIn = false;

const instanceAxs = axios.create({
    baseURL: serverApi,
    withCredentials: true
});

const checkLogin = async () => {
    await instanceAxs.get('/checklogin')
        .then(result => {
            let response = result.data.message;

            if (response === "user logged in"){
                isLoggedIn = true;
            } else {
                isLoggedIn = false;
            }
            console.log(result);
            return response;
        })
        .catch(err => {
            console.log(err);
        })
}

export {isLoggedIn, instanceAxs, checkLogin};