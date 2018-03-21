import lazyLoading from '../../store/modules/menu/lazyLoading'
import {routeConditions} from '../../config'

export const networkError = {
  name: 'NetworkError',
  path: '/errors/network-error',
  component: lazyLoading('errors/NetworkError'),
  meta: {
    conditions: [routeConditions.SYSTEM_ONLY]
  }
}
