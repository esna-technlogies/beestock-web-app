import formUrlEncoded from 'form-urlencoded'
import store from '../../store'

import { userRoles } from '../../config'
import { urlHelper } from '../../helpers'
import api from '../../api/beestock'

import {
  userSecurity as userSecurityEndpoint,
  userAccount as userAccountEndpoint,
  changeRequest as changeRequestEndpoint
} from '../../api/beestock/endpoints'




const signup = (queryParams = {}) => {
  const url = userAccountEndpoint.create
  return api.post(url, formUrlEncoded(queryParams))
}

const login = (queryParams = {}) => {
  const url = userSecurityEndpoint.login
  return api.post(url, formUrlEncoded(queryParams))
}

const verifyUser = (uuid, queryParams = {}) => {
  const url = urlHelper.reformatUrl({
    url: changeRequestEndpoint.activateAccount,
    pathParams: {
      uuid
    }
  })

  return api.patch(url, formUrlEncoded(queryParams))
}

const resetUserPassword = (queryParams) => {
  const url = userSecurityEndpoint.forgotPassword

  return api.post(url, formUrlEncoded(queryParams))
}

const isAuthenticated = () => {
  return store.getters.isAuthenticatedUser === true
}

const isVerifiedUser = () => {
  return !store.getters.currentUserRoles().includes(userRoles.INACTIVE)
}

const isJwtTokenExpired = () => {
  const expireDate = store.getters.jwtTokenExpireDate()
  return expireDate < new Date()
}


export default {
  signup,
  login,
  isAuthenticated,
  isVerifiedUser,
  verifyUser,
  resetUserPassword,
  isJwtTokenExpired
}
