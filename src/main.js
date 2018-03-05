// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'
import VuesticPlugin from 'vuestic-components/vuestic-components-plugin';
import VuesticMixinsPlugin from 'vuestic-mixins/vuestic-mixins-plugin';
import './i18n'

import Meta from 'vue-meta'


import VueValidateCustomDictionary from 'src/vee-validate-messages'
import { jwtTokenHelper } from "./helpers";
import beforeEachRoute from './router/before-each-route'


Vue.use(VuesticPlugin)
Vue.use(VuesticMixinsPlugin)
Vue.use(Meta);


// NOTE: workaround for VeeValidate + vuetable-2
Vue.use(VeeValidate, {
  fieldsBagName: 'formFields',
  dictionary: VueValidateCustomDictionary
});

sync(store, router)

let mediaHandler = () => {
  if (window.matchMedia(store.getters.config.windowMatchSizeLg).matches) {
    store.dispatch('toggleSidebar', true)
  } else {
    store.dispatch('toggleSidebar', false)
  }
}

router.beforeEach((to, from, next) => {
  store.commit('setLoading', true);

  if (!store.getters.authInfo) {
    const jwtToken = jwtTokenHelper.getCookie();
    const userDetails = jwtTokenHelper.getPayload(jwtToken);
    store.dispatch('setAuthInfo', userDetails);
  }

  return beforeEachRoute(to, from, next);
})

router.afterEach((to, from) => {
  mediaHandler()
  store.commit('setLoading', false)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
