import axios from "axios";

const serverURL = "http://localhost:3080/";
const userApi = "user";
const fileApi = "file";

const instanceAxs = axios.create({
    baseURL: serverURL,
    withCredentials: true
})

export {userApi, fileApi, instanceAxs};