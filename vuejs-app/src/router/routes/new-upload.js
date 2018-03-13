import lazyLoading from '../../store/modules/menu/lazyLoading'

export const newUpload = {
  name: 'NewUpload',
  path: '/new-upload',
  component: lazyLoading('new-upload/NewUpload'),
  meta: {
    requiresAuthenticatedUser: true,
    requiresVerifiedUser: true
  }
}
