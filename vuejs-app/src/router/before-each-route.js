import auth from '../services/auth'

const userIsNotAuthenticated = (to, from, next) => {
  return next({name: 'Login', query: {path: to.fullPath}})
}

const userIsNotVerified = (to, from, next) => {
  return next({ name: 'VerifyUser' })
}

const nextRoute = (routeRequirement, to, from, next) => {
  switch (routeRequirement) {
    case 'verifiedUser':
      if (!auth.isAuthenticated()) { return userIsNotAuthenticated(to, from, next) }

      if (!auth.isVerifiedUser()) { return userIsNotVerified(to, from, next) }
      break

    case 'authenticatedUser':
      if (!auth.isAuthenticated()) { return userIsNotAuthenticated(to, from, next) }
      break

    case 'noLogin':
      if (auth.isAuthenticated()) { return next({ name: 'Home' }) }
      break
  }

  return next()
}


const beforeEachRoute = (to, from, next) => {
  const requiresVerifiedUserRoute = to.matched.some(({ meta }) => meta.requiresVerifiedUser)

  if (requiresVerifiedUserRoute) { return nextRoute('verifiedUser', to, from, next) }

  const requiresAuthenticatedUserRoute = to.matched.some(({ meta }) => meta.requiresAuthenticatedUser)

  if (requiresAuthenticatedUserRoute) { return nextRoute('authenticatedUser', to, from, next) }

  const requiresNoLoginRoute = to.matched.some(({ meta }) => meta.requiresNoLogin)

  if (requiresNoLoginRoute) { return nextRoute('noLogin', to, from, next) }

  return next()
}

export default beforeEachRoute
