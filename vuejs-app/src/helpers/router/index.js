import router from '../../router'

const signupDone = () => {
  const alertType = 'success';
  const alertMessage = `alerts.messages.signUp.200`;
  pushTo('Login', alertType, alertMessage);
};

const signUpFailed = status => {
  const alertType = 'danger';
  const alertMessage = `alerts.messages.signUp.${status}`;
  pushTo('Login', alertType, alertMessage);
};

const loginDone = () => {
  pushTo('Home');
};

const logoutDone = () => {
  const alertType = 'success';
  const alertMessage = `alerts.messages.logout.200`;
  pushTo('Login', alertType, alertMessage);
};

const verifyUserDone = () => {
  const alertType = 'success';
  const alertMessage = `alerts.messages.verifyUser.200`;
  pushTo('Login', alertType, alertMessage);
};

const resetUserPasswordDone = () => {
  const alertType = 'success';
  const alertMessage = `alerts.messages.resetUserPassword.200`;
  pushTo('Login', alertType, alertMessage);
};

const pushTo = (routeName, alertType = '', alertMessage = '') => {
  router.push({
    name: routeName,
    params: {
      alertType,
      alertMessage
    }
  });
};


export default {
  signupDone,
  signUpFailed,
  loginDone,
  logoutDone,
  verifyUserDone,
  resetUserPasswordDone
}
