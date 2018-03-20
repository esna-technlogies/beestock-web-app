import auth from '../services/auth'
import config from '../config/index'


const userIsNotAuthenticated = (to, from, next) => {
  return next({name: 'Login', query: {path: to.fullPath}})
}

const userIsNotVerified = (to, from, next) => {
  return next({ name: 'VerifyUser' })
}

const beforeEachRoute = (to, from, next) => {
  const { VERIFIED_USER, AUTHENTICATED_USER, NO_LOGIN } = config.routeConditions

  const routeConditions = to.meta.conditions ? to.meta.conditions : []

  for (const condition of routeConditions) {
    switch (condition) {
      case VERIFIED_USER:
      case AUTHENTICATED_USER:
        if (!auth.isAuthenticated()) { return userIsNotAuthenticated(to, from, next) }

        if (!auth.isVerifiedUser()) { return userIsNotVerified(to, from, next) }
        break

      case NO_LOGIN:
        if (auth.isAuthenticated()) { return next({ name: 'Home' }) }
        break
    }
  }

  return next()
}

export default beforeEachRoute
