const axios = require('axios').default;
import store from './store/index'


let baseURL
let backend_ip = process.env.VUE_APP_BACKEND_IP ? process.env.VUE_APP_BACKEND_IP : 'localhost'
let backend_port = process.env.VUE_APP_BACKEND_PORT ? process.env.VUE_APP_BACKEND_PORT : ''
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://' + backend_ip + ':' + backend_port + '/'
} else {
    baseURL = location.protocol + '//' + location.hostname  + '/'
}
axios.defaults.baseURL = baseURL + 'api';

axios.interceptors.request.use(
    config => {
        store.dispatch('startLoading')
        return config;
    },
    error => {
        store.dispatch('stopLoading')
        return response;
    }
);

axios.interceptors.response.use(
    response => {
        store.dispatch('stopLoading')
        return response;
    },
    error => {
        store.dispatch('stopLoading')
        return response;
    }
);

export default axios
