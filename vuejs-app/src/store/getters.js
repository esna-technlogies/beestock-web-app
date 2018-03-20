import utils from 'services/utils'

const menuItems = state => state.menu.items
const sidebarOpened = state => state.app.sidebar.opened
const toggleWithoutAnimation = state => state.app.sidebar.withoutAnimation
const config = state => state.app.config
const palette = state => state.app.config.palette
const isLoading = state => state.app.isLoading
const isPageLoading = state => state.app.isPageLoading
const isAuthenticatedUser = state => state.app.isAuthenticatedUser
const currentUserUUID = () => () => utils.getCurrentUserUUID()
const currentUserJwtToken = () => () => utils.getCurrentUserJwtToken()
const currentUserRoles = () => () => utils.getCurrentUserRoles()
const jwtTokenExpireDate = () => () => utils.getJwtTokenExpireDate()
const breadcrumbs = state => {
  return (keyword) => utils.findInNestedByName(state.menu.items, keyword)
}

export {
  menuItems,
  toggleWithoutAnimation,
  sidebarOpened,
  config,
  palette,
  isLoading,
  isPageLoading,
  breadcrumbs,
  isAuthenticatedUser,
  currentUserUUID,
  currentUserJwtToken,
  currentUserRoles,
  jwtTokenExpireDate
}
