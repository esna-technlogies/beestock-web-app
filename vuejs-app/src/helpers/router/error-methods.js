import { redirectTo } from './route-methods'

export const networkError = () => {
  redirectTo('NetworkError')
}

export const categoryNotFound = () => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.findCategory.404`
  redirectTo('Home', alertType, alertMessage)
}

export const photoNotFound = () => {
  const alertType = 'danger'
  const alertMessage = `alerts.messages.findPhoto.404`
  redirectTo('Photos', alertType, alertMessage)
}

export const unknownServiceError = () => {
  const alertType = 'danger'
  const alertMessage = `errors.unknownError`
  redirectTo('Home', alertType, alertMessage)
}
