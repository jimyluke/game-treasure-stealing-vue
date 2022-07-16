import axios from 'axios';
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken, removeToken, getRefreshToken, removeRefreshToken } from '@/utilities/auth';
import _ from 'lodash';
import router from '../router';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 45000 // request timeout
});

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['x-app-id'] = '123456';

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // {'Authorization': `Bearer ${state.token}`}
      // config.headers['Authorization'] = getToken()
      config.headers['Authorization'] = `Bearer ${getToken()}`;
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(

  response => {
    return response.data;
  },

  error => {
    return Promise.reject(error)
  }
)

export default service