import Axios from 'axios';
const baseURL = 'http://api.mirrors.local:420';

export default (vm) => {

  function addTokenToRequest(response) {
    const token = localStorage.getItem('token');
    if (token) {
      response.headers['Authorization'] = 'Bearer ' + token;
    }
    return response;
  };

  function exitIfNoValid(error) {
    if (error.request.status === 401) {
      const app = vm.$children[0];
      app.logout();
    }
    return Promise.reject(error);
  }

  const instanceAxios = Axios.create({ baseURL });

  instanceAxios.interceptors.request.use(addTokenToRequest, Promise.reject);
  instanceAxios.interceptors.response.use(r => r, exitIfNoValid);

  return instanceAxios;
};
