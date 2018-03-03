import formUrlEncoded from 'form-urlencoded'
import store from '../../store'

import { userSecurity as userSecurityEndpoint,
  userAccount as userAccountEndpoint,
  changeRequest as changeRequestEndpoint } from '../../api/beestock/endpoints'

import { urlHelper } from '../../helpers'

import api from '../../api/beestock'

const signUp = (queryParams = {}) => {
  const url = userAccountEndpoint.create;
  return api.post(url, formUrlEncoded(queryParams));
};

const login = (queryParams = {}) => {
  const url = userSecurityEndpoint.login;
  return api.post(url, formUrlEncoded(queryParams));
};

const verifyUser = (uuid, queryParams = {}) => {
  const url = urlHelper.reformatUrl({
    url: changeRequestEndpoint.activateAccount,
    pathParams: {
      uuid
    }
  });

  return api.patch(url, formUrlEncoded(queryParams));
};

const resetUserPassword = (emailOrMobileNumber) => {
  const url = urlHelper.reformatUrl({
    url: userSecurityEndpoint.forgotPassword,
  });

  const queryParams = {userName: emailOrMobileNumber};

  return api.post(url, formUrlEncoded(queryParams));
};

const isAuthenticated = () => {
  return store.getters.authInfo !== null;
};

const isVerifiedUser = () => {
  return !store.getters.authInfo.roles.includes('ROLE_INACTIVE');
};


export default {
  signUp,
  login,
  isAuthenticated,
  isVerifiedUser,
  verifyUser,
  resetUserPassword
}
