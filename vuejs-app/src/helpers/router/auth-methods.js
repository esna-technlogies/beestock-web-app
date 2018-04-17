import { redirectTo } from './route-methods'

const signupDone = () => {
  const alertType = 'success'
  const alertMessage = `alerts.messages.signUp.200`
  redirectTo('Login', alertType, alertMessage)
}

const signUpFailed = status => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.signUp.${status}`
  redirectTo('Login', alertType, alertMessage)
}

const loginDone = () => {
  redirectTo('Home')
}

const logoutDone = () => {
  const alertType = 'success'
  const alertMessage = `alerts.messages.logout.200`
  redirectTo('Login', alertType, alertMessage)
}

const verifyUserDone = () => {
  const alertType = 'success'
  const alertMessage = `alerts.messages.verifyUser.200`
  redirectTo('Login', alertType, alertMessage)
}

const resetUserPasswordDone = () => {
  const alertType = 'success'
  const alertMessage = `alerts.messages.resetUserPassword.200`
  redirectTo('Login', alertType, alertMessage)
}

const loginSessionExpired = () => {
  const alertType = 'warning'
  const alertMessage = `alerts.messages.loginSessionExpired.401`
  redirectTo('Login', alertType, alertMessage)
}


export default {
  signupDone,
  signUpFailed,
  loginDone,
  logoutDone,
  verifyUserDone,
  resetUserPasswordDone,
  loginSessionExpired
}
