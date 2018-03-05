import { category as categoryEndpoint } from '../../api/beestock/endpoints'
import api from '../../api/beestock/auth'
import { urlHelper } from '../../helpers'


const findAll = () => {
  const url = categoryEndpoint.findAll;
  return api.get(url);
};

const findByUUID = uuid => {
  const url = urlHelper.reformatUrl({
    url: categoryEndpoint.findByUUID,
    pathParams: {
      uuid
    }
  });

  return api.get(url);
};

const findRandomPhotoByUUID = uuid => {
  const url = urlHelper.reformatUrl({
    url: categoryEndpoint.findRandomPhotoByUUID,
    pathParams: {
      uuid
    }
  });

  return api.get(url);
};

export default {
  findAll,
  findByUUID,
  findRandomPhotoByUUID
}
