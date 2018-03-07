import auth from "../services/auth";

const nextRouteForRequiresAuthenticatedUserRoute = (to, from, next) => {
  return !auth.isAuthenticated()
    ? nextRouteWhenUserIsNotAuthenticated(to, from, next)
    : next();
};

const nextRouteForRequiresVerifiedUserRoute = (to, from, next) => {
  if (!auth.isAuthenticated()) return nextRouteWhenUserIsNotAuthenticated(to, from, next);

  if (!auth.isVerifiedUser()) return nextRouteWhenUserIsNotVerified(to, from, next);

  return next()
};

const nextRouteForRequiresNoLoginRoute = (to, from, next) => {
  return auth.isAuthenticated()
    ? next({ name: 'Home' })
    : next();
};

const nextRouteWhenUserIsNotAuthenticated = (to, from, next) => {
  const {name, fullPath} = to;
  const query = (name != undefined) ? {redirect: name} : {path: fullPath};

  return next({name: 'Login', query});
};

const nextRouteWhenUserIsNotVerified = (to, from, next) => {
  /*const { name, fullPath } = to;
  const query = (name != undefined) ? { redirect: name } : { path: fullPath };*/

  return next({ name: 'VerifyUser' });
};


const beforeEachRoute = (to, from, next) => {
  const requiresVerifiedUserRoute = to.matched.some(({ meta }) => meta.requiresVerifiedUser);

  if (requiresVerifiedUserRoute) return nextRouteForRequiresVerifiedUserRoute(to, from, next);


  const requiresAuthenticatedUserRoute = to.matched.some(({ meta }) => meta.requiresAuthenticatedUser);

  if (requiresAuthenticatedUserRoute) return nextRouteForRequiresAuthenticatedUserRoute(to, from, next);


  const requiresNoLoginRoute = to.matched.some(({ meta }) => meta.requiresNoLogin);

  if (requiresNoLoginRoute) return nextRouteForRequiresNoLoginRoute(to, from, next);

  return next();
};

export default beforeEachRoute;
