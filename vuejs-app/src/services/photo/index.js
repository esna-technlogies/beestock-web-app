import getFormData from 'form-urlencoded'
import api from '../../api/beestock'
import { urlHelper } from '../../helpers'
import userService from '../../services/user'
import categoryService from '../../services/category'
import { photo as photoEndpoint } from '../../api/beestock/endpoints'


const findAll = (queryParams) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findAll,
    queryParams
  })
  return api.get(url)
}

const findByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findByUUID,
    pathParams: { uuid }
  })
  return api.get(url)
}

const create = (queryParams = {}) => {
  const url = photoEndpoint.create

  return api.post(url, getFormData(queryParams))
}

const deleteByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.deleteByUUID,
    pathParams: { uuid }
  })
  return api.delete(url)
}

const findAllByUserUUID = (uuid, queryParams = {}) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findAllByUserUUID,
    pathParams: { uuid },
    queryParams
  })

  return api.get(url)
}

const getSuggestedKeywords = (queryParams) => {
  const url = photoEndpoint.getSuggestedKeywords

  return api.post(url, getFormData(queryParams))
}

const findAllByCategoryUUID = (uuid, queryParams = {}) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findAllByCategoryUUID,
    pathParams: { uuid },
    queryParams
  })

  return api.get(url)
}

const fetchPhotoUser = (uuid) => {
  return userService.findByUUID(uuid)
    .then(response => response.data.user)
}

const fetchPhotoCategory = (uuid) => {
  return categoryService.findByUUID(uuid)
    .then(response => response.data.category)
}


export default {
  findAll,
  findByUUID,
  create,
  deleteByUUID,
  findAllByUserUUID,
  getSuggestedKeywords,
  fetchPhotoUser,
  fetchPhotoCategory,
  findAllByCategoryUUID: findAllByCategoryUUID
}
