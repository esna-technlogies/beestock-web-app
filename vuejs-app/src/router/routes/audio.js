import lazyLoading from '../../store/modules/menu/lazyLoading'

export const audio = {
  name: 'Audio',
  path: '/audio',
  component: lazyLoading('audio/Audio'),
  meta: {
    requiresAuthenticatedUser: false
  }
}
