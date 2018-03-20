import authMethods from './auth-methods'

export default {
  signupDone: authMethods.signupDone,
  signUpFailed: authMethods.signUpFailed,
  loginDone: authMethods.loginDone,
  logoutDone: authMethods.logoutDone,
  verifyUserDone: authMethods.verifyUserDone,
  resetUserPasswordDone: authMethods.resetUserPasswordDone,
  jwtTokenExpired: authMethods.jwtTokenExpired
}
