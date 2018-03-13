import lazyLoading from '../../store/modules/menu/lazyLoading'

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
    requiresNoLogin: true
  }
}

export const verifyUser = {
  name: 'VerifyUser',
  path: '/verify-user',
  component: lazyLoading('auth/verify-user/VerifyUser')
}
