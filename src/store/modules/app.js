import * as types from '../mutation-types'

import authService from '../../services/auth'
import { jwtTokenHelper } from '../../helpers'

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
  isLoading: true,
  authInfo: null,
  isAuth: false,
  jwtToken: ''
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
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setAuth (state, isAuth) {
    state.isAuth = isAuth
  },
  setAuthInfo (state, userDetails) {
    state.authInfo = userDetails;
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
  setAuthInfo ({ commit }, value) {
    commit('setAuthInfo', value);
  },
  clearAuthInfo ({ commit }) {
    commit('setAuthInfo', null);
  },
  doSignup ({ commit }, userDetails) {
    return authService.signUp(userDetails)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error)
      });
  },
  doLogin ({ commit }, credentials) {
    return authService.login(credentials)
      .then(response => {
        const token = response.data.token;
        jwtTokenHelper.setCookie(token);

        commit('setAuthInfo', jwtTokenHelper.getPayload());

        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  doLogout ({ commit }) {
    commit('setAuthInfo', null);
    jwtTokenHelper.removeCookie();
    return Promise.resolve();
  },
  verifyUser ({ commit }, verificationDetails) {
    const queryParams = { code: verificationDetails.code };

    return authService.verifyUser(verificationDetails.uuid, queryParams)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      });
  },
  doResetPassword ({ commit }, emailOrMobileNumber) {
    return authService.resetUserPassword(emailOrMobileNumber)
      .then(response => {
        return Promise.resolve(response);
      })
      .catch(error => {
        return Promise.reject(error);
      })
  }
}

export default {
  state,
  mutations,
  actions
}
