import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

export const illustrations = {
  name: 'Illustrations',
  path: '/illustrations',
  component: lazyLoading('illustrations/Illustrations'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}
