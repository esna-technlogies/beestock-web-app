import lazyLoading from '../../store/modules/menu/lazyLoading'

export const photos = {
  name: 'Photos',
  path: '/photos',
  component: lazyLoading('photos/Photos'),
  props: true,
  children: [
    {
      name: 'Photo',
      path: ':uuid',
      component: lazyLoading('photos/Photo'),
      props: true
    }
  ]
}
