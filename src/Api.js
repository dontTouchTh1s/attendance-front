import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:8000/api',
    timeout: 3000,
    withCredentials: true
})
export default instance
