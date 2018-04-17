import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

const {AUTHENTICATED_USER, VERIFIED_USER} = routeConditions

export const newUpload = {
  name: 'NewUpload',
  path: '/new-upload',
  component: lazyLoading('new-upload/NewUpload'),
  meta: {
    requires: [AUTHENTICATED_USER, VERIFIED_USER]
  }
}
