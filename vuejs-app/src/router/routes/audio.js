import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

export const audio = {
  name: 'Audio',
  path: '/audio',
  component: lazyLoading('audio/Audio'),
  meta: {
    conditions: routeConditions.AUTHENTICATED_USER
  }
}
