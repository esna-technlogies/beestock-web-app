import lazyLoading from '../../store/modules/menu/lazyLoading'

export const footage = {
  name: 'Footage',
  path: '/footage',
  component: lazyLoading('footage/Footage')
}
