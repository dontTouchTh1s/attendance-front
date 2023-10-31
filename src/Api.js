import axios from "axios";
import getCookie from "./Functions/GetCookie/GetCookie";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true
});
instance.interceptors.request.use(async (config) => {
    if (!getCookie('XSRF-TOKEN')) {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});
instance.interceptors.response.use(response => response,
    async (error) => {
        if (error.response) {
            if (error.response.status === 419) {
                await axios.get('http://localhost:8000/sanctum/csrf-cookie', {withCredentials: true});
                return axios(error.config);
            }
        }
        return Promise.reject(error);
    });
export default instance
