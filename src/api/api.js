import axios from "axios";

const api = 'https://dg-gruppe-app.christoph-swoboda.com/api';
// const api = 'http://localhost:8000/api';
// const api = process.env.REACT_APP_API_URL;
let BaseApi = axios.create({
    baseURL: api,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Credentials': 'true'
    },
});


let Api = function() {

    const token=localStorage.getItem('token');
    if (token) {
        BaseApi.defaults.headers.common["Authorization"] = token;
    }
    return BaseApi;
};

export default Api;
