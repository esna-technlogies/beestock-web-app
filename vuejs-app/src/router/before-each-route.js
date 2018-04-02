import auth from '../services/auth'
import {routeConditions} from '../config'
import {routerHelper} from '../helpers'
import store from '../store'


const userIsNotAuthenticated = (to, from, next) => {
  return next({name: 'Login', query: {path: to.fullPath}})
}

const userIsNotVerified = (to, from, next) => {
  return next({ name: 'VerifyUser' })
}

const jwtTokenIsExpired = async (to, from, next) => {
  await store.dispatch('doLogout')
  routerHelper.loginSessionExpired()
}

const beforeEachRoute = (to, from, next) => {
  const { VERIFIED_USER, AUTHENTICATED_USER, NO_LOGIN } = routeConditions

  const routeRequires = to.meta.requires ? to.meta.requires : []

  console.log('routeRequires', routeRequires)

  for (const condition of routeRequires) {
    switch (condition) {
      case VERIFIED_USER:
        if (!auth.isAuthenticated()) { return userIsNotAuthenticated(to, from, next) }

        if (auth.isJwtTokenExpired()) { return jwtTokenIsExpired(to, from, next) }

        if (!auth.isVerifiedUser()) { return userIsNotVerified(to, from, next) }
        break

      case AUTHENTICATED_USER:
        if (!auth.isAuthenticated()) { return userIsNotAuthenticated(to, from, next) }

        if (auth.isJwtTokenExpired()) { return jwtTokenIsExpired(to, from, next) }
        break

      case NO_LOGIN:
        if (auth.isAuthenticated()) { return next({ name: 'Home' }) }
        break
    }
  }

  return next()
}

export default beforeEachRoute
