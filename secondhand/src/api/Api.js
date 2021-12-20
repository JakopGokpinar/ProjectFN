import axios from 'axios';

import { serverApi } from '../config/index.js';

export const instanceAxs = axios.create({
    baseURL: serverApi,
    withCredentials: true
});