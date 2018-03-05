import lazyLoading from '../store/modules/menu/lazyLoading'

const home = {
  name: 'Home',
  path: '/',
  component: lazyLoading('home/Home'),
  props: true
};

// --------------------------------------------------
// Auth Routes
const login = {
  name: 'Login',
  path: '/login',
  component: lazyLoading('auth/login/Login'),
  props: true
};

const signup = {
  name: 'Register',
  path: '/register',
  component: lazyLoading('auth/signup/Signup')
};

const resetPassword = {
  name: 'ResetPassword',
  path: '/reset-password',
  component: lazyLoading('auth/reset-password/ResetPassword'),
  props: true,
  meta: {
    requiresNoLogin: true
  }
};

const verifyUser = {
  name: 'VerifyUser',
  path: '/verify-user',
  component: lazyLoading('auth/verify-user/VerifyUser')
};

// --------------------------------------------------
// User Routes
const profile = {
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
};

const userUploads = {
  name: 'UserUploads',
  path: '/my-uploads',
  component: lazyLoading('user-uploads/UserUploads'),
  meta: {
    requiresAuthenticatedUser: true
  }
};


// --------------------------------------------------
// Photos Routes
const photos = {
  name: 'Photos',
  path: '/photos',
  component: lazyLoading('photos/Photos'),
  meta: {
    requiresAuthenticatedUser: false
  }
};

const illustrations = {
  name: 'Illustrations',
  path: '/illustrations',
  component: lazyLoading('illustrations/Illustrations'),
  meta: {
    requiresAuthenticatedUser: false
  }
};


// --------------------------------------------------
// Footage Routes
const footage = {
  name: 'Footage',
  path: '/footage',
  component: lazyLoading('footage/Footage'),
  meta: {
    requiresAuthenticatedUser: false
  }
};


// --------------------------------------------------
// Audio Routes
const audio = {
  name: 'Audio',
  path: '/audio',
  component: lazyLoading('audio/Audio'),
  meta: {
    requiresAuthenticatedUser: false
  }
};

// --------------------------------------------------
// New Upload Routes
const newUpload = {
  name: 'NewUpload',
  path: '/new-upload',
  component: lazyLoading('new-upload/NewUpload'),
  meta: {
    requiresAuthenticatedUser: true,
    requiresVerifiedUser: true
  }
};


// --------------------------------------------------
// New Upload Routes
const category = {
  name: 'Category',
  path: '/category',
  component: lazyLoading('category/Category'),
  meta: {
    requiresAuthenticatedUser: true,
  },
  children: [
    {
      name: 'CategoryDetails',
      path: ':uuid',
      component: lazyLoading('category/CategoryDetails')
    }
  ]
}


export default [
  home,
  login,
  signup,
  resetPassword,
  verifyUser,
  profile,
  userUploads,
  photos,
  illustrations,
  footage,
  audio,
  newUpload,
  category
]
