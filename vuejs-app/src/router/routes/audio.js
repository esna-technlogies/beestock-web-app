import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

const {AUTHENTICATED_USER} = routeConditions

export const audio = {
  name: 'Audio',
  path: '/audio',
  component: lazyLoading('audio/Audio'),
  meta: {
    requires: [AUTHENTICATED_USER]
  }
}
