import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8090/api/'
axios.defaults.headers.post["Content-Type"] = 'application/json'

export const request = (method, url, data, token) => {
    return axios({
        method: method,
        url: url,
        data: data,
        headers: { Authorization: `Bearer ${token}` }
    });
};