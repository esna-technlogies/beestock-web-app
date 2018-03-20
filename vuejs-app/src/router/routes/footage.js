import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

export const footage = {
  name: 'Footage',
  path: '/footage',
  component: lazyLoading('footage/Footage'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}
