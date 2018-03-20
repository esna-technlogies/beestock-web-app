import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

export const profile = {
  name: 'Profile',
  path: '/profile',
  component: lazyLoading('profile/Profile'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  },
  children: [
    {
      name: 'ProfileDetails',
      path: 'details',
      component: lazyLoading('profile/ProfileDetails'),
      meta: {
        conditions: [routeConditions.AUTHENTICATED_USER]
      }
    },
    {
      name: 'AddressAndBillingDetails',
      path: 'address-and-billing-details',
      component: lazyLoading('profile/AddressAndBillingDetails'),
      meta: {
        conditions: [routeConditions.AUTHENTICATED_USER]
      }
    },
    {
      name: 'ChangePassword',
      path: 'change-password',
      component: lazyLoading('profile/ChangePassword'),
      meta: {
        conditions: [routeConditions.AUTHENTICATED_USER]
      }
    }
  ]
}

export const userUploads = {
  name: 'UserUploads',
  path: '/my-uploads',
  component: lazyLoading('user-uploads/UserUploads'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}

export const userPhotos = {
  name: 'UserPhotos',
  path: '/my-photos',
  component: lazyLoading('user-uploads/UserPhotos'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}

export const userIllustrations = {
  name: 'UserIllustrations',
  path: '/my-illustrations',
  component: lazyLoading('user-uploads/UserIllustrations'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}

export const userFootage = {
  name: 'UserFootage',
  path: '/my-footage',
  component: lazyLoading('user-uploads/UserFootage'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}

export const userAudio = {
  name: 'UserAudio',
  path: '/my-audio',
  component: lazyLoading('user-uploads/UserAudio'),
  meta: {
    conditions: [routeConditions.AUTHENTICATED_USER]
  }
}
