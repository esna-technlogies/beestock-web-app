import axios from 'axios/index'

axios.defaults.baseURL = 'http://api.beesstock.com';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';


export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch
}
