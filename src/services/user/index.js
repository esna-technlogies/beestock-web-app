import getFormData from 'form-urlencoded'
// import store from '../../store'

import { userSecurity as userSecurityEndpoint, userAccount as userAccountEndpoint } from '../../api/beestock/endpoints'

// import beestockApi from '../../api/beestock'
import { urlHelper } from '../../helpers'


// import helpers from '../../helpers'
import api from '../../api/beestock/auth'

let findByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: userAccountEndpoint.findByUUID,
    pathParams: {
      uuid
    }
  });
  return api.get(url);
};

let updateByUUID = (uuid, queryParams = {}) => {
  const url = urlHelper.reformatUrl({
    url: userAccountEndpoint.partialUpdate,
    pathParams: {
      uuid
    }
  });
  return api.patch(url, getFormData(queryParams));
};

let deleteByUUID = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: userAccountEndpoint.delete,
    pathParams: {
      uuid
    }
  });
  return api.delete(url);
};


export default {
  findByUUID,
  updateByUUID,
  deleteByUUID
}
