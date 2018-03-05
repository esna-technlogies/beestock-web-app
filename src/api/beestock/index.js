import axios from 'axios/index'
import { jwtTokenHelper } from "../../helpers";

axios.defaults.baseURL = 'http://api.beesstock.com';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${jwtTokenHelper.getCookie()}`
axios.defaults.headers.patch['Content-Type'] = 'application/x-www-form-urlencoded';

const setAuthorizationHeader = (jwtToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
};

export default {
  get: axios.get,
  post: axios.post,
  patch: axios.patch,
  delete: axios.delete,
  setAuthorizationHeader
}
