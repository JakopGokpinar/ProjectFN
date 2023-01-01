import axios from "axios";
var serverApi = "http://localhost:3080/";
const serverURL = "http://localhost:3080/";
var userApi = "user";
var fileApi = "file";

const instanceAxs = axios.create({
    baseURL: serverURL,
    withCredentials: true
})

export {serverApi,userApi, fileApi, instanceAxs};