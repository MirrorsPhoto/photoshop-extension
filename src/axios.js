import Axios from 'axios';

const instanceAxios = Axios.create({
    baseURL: 'http://api.jonkofee.ru'
});

instanceAxios.interceptors.request.use(
    response => {
        const token = localStorage.getItem('token');
        if (token) response.headers['Authorization'] = 'Bearer ' + token;
        return response;
    },
    error => Promise.reject(error)
);

instanceAxios.interceptors.response.use(
    response => response,
    error => {
        if (error.request.status === 401) {
            if (localStorage.getItem('token')) localStorage.removeItem('token');
            vm.$router.push('/login');
        }
        return Promise.reject(error);
    }
);


export default instanceAxios;

