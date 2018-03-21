import authMethods from './auth-methods'
import {
  networkError, categoryNotFound,
  unknownServiceError, photoNotFound
} from './error-methods'

export default {
  signupDone: authMethods.signupDone,
  signUpFailed: authMethods.signUpFailed,
  loginDone: authMethods.loginDone,
  logoutDone: authMethods.logoutDone,
  verifyUserDone: authMethods.verifyUserDone,
  resetUserPasswordDone: authMethods.resetUserPasswordDone,
  loginSessionExpired: authMethods.loginSessionExpired,
  networkError,
  categoryNotFound,
  photoNotFound,
  unknownServiceError
}
