import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

const {NO_LOGIN} = routeConditions

export const login = {
  name: 'Login',
  path: '/login',
  component: lazyLoading('auth/login/Login'),
  props: true,
  meta: {
    requires: [NO_LOGIN]
  }
}

export const signup = {
  name: 'Register',
  path: '/register',
  component: lazyLoading('auth/signup/Signup'),
  meta: {
    requires: [NO_LOGIN]
  }
}

export const registerPublisher = {
  name: 'RegisterPublisher',
  path: '/register/publisher',
  component: lazyLoading('auth/signup/PublisherSignup'),
  meta: {
    requires: [NO_LOGIN]
  }
}

export const registerPhotographer = {
  name: 'RegisterPhotographer',
  path: '/register/photographer',
  component: lazyLoading('auth/signup/PhotographerSignup'),
  meta: {
    requires: [NO_LOGIN]
  }
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
