import lazyLoading from '../../store/modules/menu/lazyLoading'

export const home = {
  name: 'Home',
  path: '/',
  component: lazyLoading('home/Home'),
  props: true
}
