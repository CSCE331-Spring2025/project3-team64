import axios from 'axios';

const api = axios.create({
    baseURL: "https://backend-gcar.onrender.com",
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },
    withCredentials: false
});
export default api;