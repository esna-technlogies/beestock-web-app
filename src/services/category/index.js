import { category as categoryEndpoint } from '../../api/beestock/endpoints'
import beestockApi from '../../api/beestock'
import { urlHelper } from '../../helpers'


const findAll = () => {
  const url = categoryEndpoint.findAll;
  return beestockApi.get(url);
};

const findByUUID = uuid => {
  const url = urlHelper.reformatUrl({
    url: categoryEndpoint.findByUUID,
    pathParams: {
      uuid
    }
  });

  return beestockApi.get(url);
};

export default {
  findAll,
  findByUUID
}
