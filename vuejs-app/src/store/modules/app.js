import * as types from '../mutation-types'

import authService from '../../services/auth'
import userService from '../../services/user'
import api from '../../api/beestock'

import JwtDecode from 'jwt-decode';

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
  isAuthenticatedUser: false,
  jwtToken: '',
  userDetails: {
    uuid: '',
    email: '',
    firstName: '',
    lastName: '',
    roles: []
  }
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
  setUserAsAuthenticated (state) {
    state.isAuthenticatedUser = true;
  },
  setUserAsVisitor (state) {
    state.isAuthenticatedUser = false;
  },
  setJwtToken (state, token) {
    state.jwtToken = token;
  },
  setUserDetails (state, userDetails) {
    Object.keys(userDetails)
      .map(item => state.userDetails[item] = userDetails[item]);
  },
  clearUserDetails (state) {
    Object.keys(state.userDetails)
      .map(item => state.userDetails[item] = '');
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
      .then(response => response);
  },
  async doLogin ({ commit, dispatch }, credentials) {
    const token = await authService.login(credentials)
      .then(response => response.data.token);

    await dispatch('storeJwtToken', token);

    const uuid = JwtDecode(token).userId;

    const user = await userService.findByUUID(uuid)
      .then(response => response.data.user)
      .then(user => {
        return {
          uuid: user.uuid,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          roles: user.access_info.roles
        }
      });

    await dispatch('storeUserDetails', user);
    await commit('setUserAsAuthenticated');
  },
  doLogout ({ commit }) {
    localStorage.removeItem('jwtToken');

    Object.keys(state.userDetails)
      .map(item => localStorage.removeItem(item));

    commit('clearUserDetails');
    commit('setUserAsVisitor');
  },
  verifyUser ({ commit }, verificationDetails) {
    const queryParams = { code: verificationDetails.code };
    const uuid = verificationDetails.uuid

    return authService.verifyUser(uuid, queryParams)
      .then(response => response);
  },
  doResetPassword ({ commit }, emailOrMobileNumber) {
    return authService.resetUserPassword(emailOrMobileNumber)
      .then(response => response);
  },
  storeUserDetails ({ commit }, userDetails) {
    commit('setUserDetails', userDetails);

    Object.keys(userDetails)
      .map(item => localStorage.setItem(item, userDetails[item]));
  },
  storeJwtToken ({ commit }, token) {
    api.setAuthorizationHeader(token);
    commit('setJwtToken', token);
    localStorage.setItem('jwtToken', token);
  }
}

export default {
  state,
  mutations,
  actions
}
