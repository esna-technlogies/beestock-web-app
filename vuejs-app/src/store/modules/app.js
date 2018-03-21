import * as types from '../mutation-types'

import authService from '../../services/auth'
import userService from '../../services/user'
import api from '../../api/beestock'
import utils from '../../services/utils'

import JwtDecode from 'jwt-decode'

const state = {
  sidebar: {
    opened: false,
    withoutAnimation: false
  },
  config: {
    googleMaps: {
      apiKey: 'AIzaSyBNAqPrTQoz9P4NBlDDyfxrnKiafkaL8iQ'
    },
    windowMatchSizeLg: '(min-width: 992px)',
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    }
  },
  isPageLoading: true,
  isAuthenticatedUser: false
}

const mutations = {
  [types.CLOSE_MENU] (state) {
    if (document.documentElement.clientWidth < 992) {
      state.sidebar.opened = false
    }
  },
  [types.TOGGLE_SIDEBAR] (state, opened) {
    state.sidebar.opened = opened
  },
  [types.TOGGLE_WITHOUT_ANIMATION] (state, value) {
    state.sidebar.withoutAnimation = value
  },
  setPageLoading (state, isPageLoading) {
    state.isPageLoading = isPageLoading
  },
  setAuthenticated (state, isAuthenticated) {
    state.isAuthenticatedUser = isAuthenticated
  }
}

const actions = {
  closeMenu ({ commit }) {
    commit(types.CLOSE_MENU)
  },
  toggleSidebar ({ commit }, opened) {
    commit(types.TOGGLE_SIDEBAR, opened)
  },
  isToggleWithoutAnimation ({ commit }, value) {
    commit(types.TOGGLE_WITHOUT_ANIMATION, value)
  },
  doSignup ({ commit }, userDetails) {
    return authService.signup(userDetails)
      .then(response => response)
  },
  async doLogin ({ commit, dispatch }, credentials) {
    const token = await authService.login(credentials)
      .then(response => response.data.token)

    await dispatch('storeJwtToken', token)

    api.setAuthorizationHeader()

    const decodedToken = JwtDecode(token)

    await userService.findByUUID(decodedToken.userId)
      .then(response => response.data.user)
      .then(user => {
        return {
          uuid: user.uuid,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          roles: user.access_info.roles.join(','),
          expireDate: decodedToken.exp
        }
      })
      .then(userDetails => {
        return dispatch('storeUserDetails', userDetails)
      })
      .then(() => {
        return commit('setAuthenticated', true)
      })
  },
  doLogout ({ commit }) {
    commit('setAuthenticated', false)
    utils.clearAuthStorage()
  },
  verifyUser ({ commit }, verificationDetails) {
    const queryParams = { code: verificationDetails.code }
    const uuid = verificationDetails.uuid

    return authService.verifyUser(uuid, queryParams)
      .then(response => response)
  },
  doResetPassword ({ commit }, emailOrMobileNumber) {
    const queryParams = { userName: emailOrMobileNumber }
    return authService.resetUserPassword(queryParams)
      .then(response => response)
  },
  storeUserDetails ({ commit }, userDetails) {
    utils.storeCurrentUserDetails(userDetails)
  },
  storeJwtToken ({ commit }, token) {
    utils.storeCurrentUserJwtToken(token)
  }
}

export default {
  state,
  mutations,
  actions
}
