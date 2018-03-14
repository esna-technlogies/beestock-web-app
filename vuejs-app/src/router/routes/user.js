import lazyLoading from '../../store/modules/menu/lazyLoading'

export const profile = {
  name: 'Profile',
  path: '/profile',
  component: lazyLoading('profile/Profile'),
  meta: {
    requiresAuthenticatedUser: true
  },
  children: [
    {
      name: 'ProfileDetails',
      path: 'details',
      component: lazyLoading('profile/ProfileDetails'),
      meta: {
        requiresAuthenticatedUser: true
      }
    },
    {
      name: 'AddressAndBillingDetails',
      path: 'address-and-billing-details',
      component: lazyLoading('profile/AddressAndBillingDetails'),
      meta: {
        requiresAuthenticatedUser: true
      }
    },
    {
      name: 'ChangePassword',
      path: 'change-password',
      component: lazyLoading('profile/ChangePassword'),
      meta: {
        requiresAuthenticatedUser: true
      }
    }
  ]
}

export const userUploads = {
  name: 'UserUploads',
  path: '/my-uploads',
  component: lazyLoading('user-uploads/UserUploads'),
  meta: {
    requiresAuthenticatedUser: true
  }
}

export const userPhotos = {
  name: 'UserPhotos',
  path: '/my-photos',
  component: lazyLoading('user-uploads/UserPhotos'),
  meta: {
    requiresAuthenticatedUser: true
  }
}

export const userIllustrations = {
  name: 'UserIllustrations',
  path: '/my-illustrations',
  component: lazyLoading('user-uploads/UserIllustrations'),
  meta: {
    requiresAuthenticatedUser: true
  }
}

export const userFootage = {
  name: 'UserFootage',
  path: '/my-footage',
  component: lazyLoading('user-uploads/UserFootage'),
  meta: {
    requiresAuthenticatedUser: true
  }
}

export const userAudio = {
  name: 'UserAudio',
  path: '/my-audio',
  component: lazyLoading('user-uploads/UserAudio'),
  meta: {
    requiresAuthenticatedUser: true
  }
}
