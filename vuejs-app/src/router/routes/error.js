import lazyLoading from '../../store/modules/menu/lazyLoading'
import {routeConditions} from '../../config'

const {SYSTEM_ONLY} = routeConditions

export const networkError = {
  name: 'NetworkError',
  path: '/errors/network-error',
  component: lazyLoading('errors/NetworkError'),
  meta: {
    requires: [SYSTEM_ONLY]
  }
}
