import Vue from 'vue'
import Router from 'vue-router'

import appRoutes from './routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...appRoutes,
    {path: '*', redirect: { name: 'Home' }}
  ]
})
