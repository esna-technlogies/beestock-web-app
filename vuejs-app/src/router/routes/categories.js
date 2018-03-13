import lazyLoading from '../../store/modules/menu/lazyLoading'

export const categories = {
  name: 'Categories',
  path: '/categories',
  component: lazyLoading('categories/Categories'),
  meta: {
    requiresAuthenticatedUser: true,
    title: 'breadcrumbs.categories'
  },
  children: [
    {
      name: 'Category',
      path: ':uuid',
      component: lazyLoading('categories/Category'),
      props: true,
      meta: {
        title: 'breadcrumbs.category'
      },
      children: [
        {
          name: 'CategoryPhotos',
          path: 'photos',
          component: lazyLoading('categories/CategoryPhotos'),
          props: true,
          meta: {
            title: 'breadcrumbs.categoryPhotos'
          }
        },
        {
          name: 'CategoryIllustrations',
          path: 'illustrations',
          component: lazyLoading('categories/CategoryIllustrations'),
          props: true,
          meta: {
            title: 'breadcrumbs.categoryIllustrations'
          }
        },
        {
          name: 'CategoryFootage',
          path: 'footage',
          component: lazyLoading('categories/CategoryFootage'),
          props: true,
          meta: {
            title: 'breadcrumbs.categoryFootage'
          }
        },
        {
          name: 'CategoryAudio',
          path: 'audio',
          component: lazyLoading('categories/CategoryAudio'),
          props: true,
          meta: {
            title: 'breadcrumbs.categoryAudio'
          }
        }
      ]
    }
  ]
}
