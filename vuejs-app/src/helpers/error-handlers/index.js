import {logPrefixes} from '../../config/index'
import {routerHelper} from '../index'
import store from '../../store'

const { errorLogPrefix } = logPrefixes

export const handleServiceError = (error, route) => {
  if (!error.response) {
    handleUnknownError(error.message)
    return
  }

  const status = error.response.status

  switch (status) {
    case 401:
      handleUnauthorizedError()
      break

    case 404:
      handleNotFoundError(route)
      break

    default:
      handleUnknownServiceError()
  }
}

const handleUnauthorizedError = async () => {
  await store.dispatch('doLogout')
  routerHelper.loginSessionExpired()
}

const handleNotFoundError = (route) => {
  switch (route.name) {
    case 'Category':
    case 'CategoryPhotos':
    case 'CategoryIllustrations':
    case 'CategoryFootage':
    case 'CategoryAudio':
      routerHelper.categoryNotFound()
      break

    case 'Photo':
      routerHelper.photoNotFound()
      break
  }
}

const handleUnknownServiceError = () => {
  routerHelper.unknownServiceError()
}

const handleUnknownError = (error) => {
  if (!error.response) logError(error)
}

const logError = (errorMessage) => {
  console.error(errorLogPrefix, errorMessage)
}
