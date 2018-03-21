import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'


export const photos = {
  name: 'Photos',
  path: '/photos',
  component: lazyLoading('photos/Photos'),
  props: true,
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  },
  children: [
    {
      name: 'Photo',
      path: ':uuid',
      component: lazyLoading('photos/Photo'),
      props: true,
      meta: {
        conditions: [routeConditions.AUTHENTICATED_USER]
      }
    }
  ]
}
