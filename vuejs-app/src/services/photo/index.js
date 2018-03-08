import api from '../../api/beestock'
import { urlHelper } from '../../helpers'
import userService from '../../services/user'
import categoryService from '../../services/category'
import { photo as photoEndpoint } from '../../api/beestock/endpoints'


const findAll = (queryParams) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findAll,
    queryParams
  });
  return api.get(url)
};

const findByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findByUUID,
    pathParams: { uuid }
  });
  return api.get(url)
};

const deleteByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.deleteByUUID,
    pathParams: { uuid }
  });
  return api.delete(url)
};

const findByUserUUID = (uuid, queryParams) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findByUserUUID,
    pathParams: { uuid },
    queryParams
  });

  return api.get(url)
};

const findByCategoryUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: photoEndpoint.findByCategoryUUID,
    pathParams: { uuid }
  });

  return api.get(url)
};

const fetchPhotoUser = (uuid) => {
  return userService.findByUUID(uuid)
    .then(response => response.data.user)
};

const fetchPhotoCategory = (uuid) => {
  return categoryService.findByUUID(uuid)
    .then(response => response.data.category)
};


export default {
  findAll,
  findByUUID,
  deleteByUUID,
  findByUserUUID,
  fetchPhotoUser,
  fetchPhotoCategory,
  findByCategoryUUID
}
