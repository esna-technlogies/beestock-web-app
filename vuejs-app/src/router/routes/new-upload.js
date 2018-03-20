import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

export const newUpload = {
  name: 'NewUpload',
  path: '/new-upload',
  component: lazyLoading('new-upload/NewUpload'),
  meta: {
    conditions: [
      routeConditions.AUTHENTICATED_USER,
      routeConditions.VERIFIED_USER
    ]
  }
}
