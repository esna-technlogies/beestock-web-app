const baseURL = 'http://api.beesstock.com/';

const changeRequest = {
  activateAccount: '/api/user-service/changeRequest/{uuid}/activate-account'
};

const userSecurity = {
  login: '/api/user-service/security/login',
  logout: '/api/user-service/security/logout/user/{uuid}',
  forgotPassword: '/api/user-service/security/forgotPassword'
};

const userAccount = {
  findAll: '/api/user-service/user',
  create: '/api/user-service/user',
  delete: '/api/user-service/user/{uuid}',
  findByUUID: '/api/user-service/user/{uuid}',
  partialUpdate: '/api/user-service/user/{uuid}',
  replace: '/api/user-service/user/{uuid}',
  suspendByUUID: '/api/user-service/user/{uuid}/suspend'
};

const photo = {
  findAll: '/api/photo-service/photo',
  create: '/api/photo-service/photo',
  findByUUID: '/api/photo-service/photo/{uuid}',
  findByUserUUID: '/api/photo-service/photo/filter-by/user/{uuid}',
  findKeywordsList: '/api/photo-service/photo/keywords',
  findByCategoryUUID: '/api/photo-service/photo/filter-by/category/{uuid}'
};

const category = {
  findAll: '/api/photo-service/category',
  create: '/api/photo-service/category',
  findRandomPhotoByUUID: '/api/photo-service/category/random/category/{uuid}',
  delete: '/api/photo-service/category/{uuid}',
  findByUUID: '/api/photo-service/category/{uuid}'
};


export {
  baseURL,
  userSecurity,
  userAccount,
  photo,
  category,
  changeRequest
}
