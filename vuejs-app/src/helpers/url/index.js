/**
 * This function expects a URL as an argument to reformat it with query or path params.
 *
 * @param url A string represents beestock endpoint .. ex: 'https://api.beestock.com/api/photo-service/photo'
 * @param pathParams A key-value object that's used to replace path param in th URL with the value .. ex: 'https://api.beestock.com/api/photo-service/photo/{uuid}'
 * @param queryParams A key-value object that's used to add query parameters to the URL .. ex: 'https://api.beestock.com/api/user-service/user?page=1&limit=10'
 * @returns {*} A URL string formatted with path or query params
 */
const reformatUrl = ({ url, pathParams = {}, queryParams = {}}) => {
  url = replacePathParamsOfUrl(url, pathParams);
  url = addQueryParamsToUrl(url, queryParams);

  return url;
};

/**
 * It expects a URL as argument, which will be reformatted with the path parameters provided as key-value object.
 *
 * @param url A string represents beestock endpoint .. ex: 'https://api.beestock.com/api/photo-service/photo'
 * @param pathParams A key-value object that's used to replace path param in th URL with the value ex: 'https://api.beestock.com/api/photo-service/photo/{uuid}'
 * @returns {*} A URL formatted with path parameters.
 */
const replacePathParamsOfUrl = (url, pathParams) => {
  const pathParamsKeys = Object.keys(pathParams);

  if (pathParamsKeys.length !== 0) {
    for (const param of pathParamsKeys) {
      url = url.replace(`{${param}}`, pathParams[param]);
    }
  }

  return url;
};

/**
 * It expects a URL as argument, which will be reformatted with the query paramters provided as key-value object.
 *
 * @param url A string represents beestock endpoint .. ex: 'https://api.beestock.com/api/photo-service/photo'
 * @param queryParams A key-value object that's used to add query parameters to the URL .. ex: 'https://api.beestock.com/api/user-service/user?page=1&limit=10'
 * @returns {*} A URL formatted with query parameters.
 */
const addQueryParamsToUrl = (url, queryParams) => {
  const queryParamsKeys = Object.keys(queryParams);

  if (queryParamsKeys.length !== 0) {
    url = url + "?";

    for (const param of queryParamsKeys) {
      url = `${url}${param}=${queryParams[param]}`;
    }

    return url.replace(/&$/, '');
  }

  return url;
};


export default {
  reformatUrl
}
