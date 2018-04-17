import { fileStorage as fileStorageEndpoint } from '../../api/beestock/endpoints'
import { urlHelper } from '../../helpers'
import api from '../../api/beestock'


const getNewFileUploadPolicy = (uuid) => {
  const url = urlHelper.reformatUrl({
    url: fileStorageEndpoint.getNewFileUploadPolicy,
    pathParams: {uuid}
  })

  return api.get(url)
}

export default {
  getNewFileUploadPolicy
}
