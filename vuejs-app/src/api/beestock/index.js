import axios from 'axios/index'
import { beestockApiConf } from '../../config'
import utils from '../../services/utils'


axios.defaults.baseURL = beestockApiConf.url
axios.defaults.headers.common['Accept'] = beestockApiConf.acceptHeader.json
axios.defaults.headers.patch['Content-Type'] = beestockApiConf.contentType.formUrlEncoded

const setAuthorizationHeader = () => {
  const token = utils.getCurrentUserJwtToken()
  if (token) axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

const removeAuthorizationHeader = () => {
  delete axios.defaults.headers.common['Authorization']
}

setAuthorizationHeader()


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  head: axios.head,
  setAuthorizationHeader,
  removeAuthorizationHeader
}
