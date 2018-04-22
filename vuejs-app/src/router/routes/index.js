import {home} from './home'
import {login, signup, resetPassword, verifyUser, registerPublisher, registerPhotographer} from './auth'
import {profile, myUploads, myPhotos, myIllustrations, myFootage, myAudio} from './user'
import {photos} from './photos'
import {illustrations} from './illustrations'
import {footage} from './footage'
import {audio} from './audio'
import {newUpload} from './new-upload'
import {categories} from './categories'
import {networkError} from './error'


export default [
  home,
  login,
  signup,
  resetPassword,
  verifyUser,
  profile,
  myUploads,
  myPhotos,
  myIllustrations,
  myFootage,
  myAudio,
  photos,
  illustrations,
  footage,
  audio,
  newUpload,
  categories,
  networkError,
  registerPublisher,
  registerPhotographer
]
