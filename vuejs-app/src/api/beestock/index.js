import axios from 'axios/index'

const baseURL = 'http://api.beesstock.com'
const AcceptHeader = 'application/json'
const ContentType = 'application/x-www-form-urlencoded'
const jwtToken = localStorage.getItem('jwtToken')

const setAuthorizationHeader = (jwtToken) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`
}

axios.defaults.baseURL = baseURL
axios.defaults.headers.common['Accept'] = AcceptHeader
axios.defaults.headers.patch['Content-Type'] = ContentType

if (jwtToken) setAuthorizationHeader(jwtToken)

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  head: axios.head,
  setAuthorizationHeader
}
