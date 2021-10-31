import axios from 'axios';

import { serverApi } from '../config/cfg.js';

export const instanceAxs = axios.create({
    baseURL: serverApi,
    withCredentials: true
});