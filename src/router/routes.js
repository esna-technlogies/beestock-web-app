import lazyLoading from '../store/modules/menu/lazyLoading'

const home = {
  name: 'Home',
  path: '/',
  component: lazyLoading('home/Home')
}

const login = {
  name: 'Login',
  path: '/auth/login',
  component: lazyLoading('auth/login/Login')
}

const signup = {
  name: 'Signup',
  path: '/auth/signup',
  component: lazyLoading('auth/signup/Signup')
}


export default [
  home,
  login,
  signup
]
