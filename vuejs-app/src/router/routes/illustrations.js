import lazyLoading from '../../store/modules/menu/lazyLoading'

export const illustrations = {
  name: 'Illustrations',
  path: '/illustrations',
  component: lazyLoading('illustrations/Illustrations'),
  meta: {
    requiresAuthenticatedUser: false
  }
}
