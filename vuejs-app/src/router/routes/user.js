import lazyLoading from '../../store/modules/menu/lazyLoading'
import { routeConditions } from '../../config'

const {AUTHENTICATED_USER} = routeConditions

export const profile = {
  name: 'Profile',
  path: '/profile',
  component: lazyLoading('profile/Profile'),
  meta: {
    requires: [AUTHENTICATED_USER]
  },
  children: [
    {
      name: 'ProfileDetails',
      path: 'details',
      component: lazyLoading('profile/ProfileDetails'),
      meta: {
        requires: [AUTHENTICATED_USER]
      }
    },
    {
      name: 'AddressAndBillingDetails',
      path: 'address-and-billing-details',
      component: lazyLoading('profile/AddressAndBillingDetails'),
      meta: {
        requires: [AUTHENTICATED_USER]
      }
    },
    {
      name: 'ChangePassword',
      path: 'change-password',
      component: lazyLoading('profile/ChangePassword'),
      meta: {
        requires: [AUTHENTICATED_USER]
      }
    }
  ]
}

export const myUploads = {
  name: 'MyUploads',
  path: '/my-uploads',
  component: lazyLoading('my-uploads/MyUploads'),
  meta: {
    requires: [AUTHENTICATED_USER]
  }
}

export const myPhotos = {
  name: 'MyPhotos',
  path: '/my-photos',
  component: lazyLoading('my-uploads/MyPhotos'),
  meta: {
    requires: [AUTHENTICATED_USER]
  }
}

export const myIllustrations = {
  name: 'MyIllustrations',
  path: '/my-illustrations',
  component: lazyLoading('my-uploads/MyIllustrations'),
  meta: {
    requires: [AUTHENTICATED_USER]
  }
}

export const myFootage = {
  name: 'MyFootage',
  path: '/my-footage',
  component: lazyLoading('my-uploads/MyFootage'),
  meta: {
    requires: [AUTHENTICATED_USER]
  }
}

export const myAudio = {
  name: 'MyAudio',
  path: '/my-audio',
  component: lazyLoading('my-uploads/MyAudio'),
  meta: {
    requires: [AUTHENTICATED_USER]
  }
}
