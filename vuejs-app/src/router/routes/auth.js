import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

const {NO_LOGIN} = routeConditions

export const login = {
  name: 'Login',
  path: '/login',
  component: lazyLoading('auth/login/Login'),
  props: true
}

export const signup = {
  name: 'Register',
  path: '/register',
  component: lazyLoading('auth/signup/Signup')
}

export const resetPassword = {
  name: 'ResetPassword',
  path: '/reset-password',
  component: lazyLoading('auth/reset-password/ResetPassword'),
  props: true,
  meta: {
    requires: [NO_LOGIN]
  }
}

export const verifyUser = {
  name: 'VerifyUser',
  path: '/verify-user',
  component: lazyLoading('auth/verify-user/VerifyUser')
}
