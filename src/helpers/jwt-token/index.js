import JwtDecode from 'jwt-decode';


const setCookie = (token) => {
  document.cookie = `jwt-token=${token}; Path=/`;
};

const removeCookie = () => {
  document.cookie = `jwt-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
};

const getCookie = () => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookiePartsList = decodedCookie.split(';');

  for (let i = 0; i < cookiePartsList.length; i++) {
    let part = cookiePartsList[i];

    if (part.indexOf(`jwt-token=`) === 0) {
      return part.substring('jwt-token'.length +1, part.length);
    }
  }

  return null;
};

const getPayload = (jwtToken) => {
  return jwtToken ? JwtDecode(jwtToken) : null;
};


export default {
  getCookie,
  setCookie,
  removeCookie,
  getPayload
}
