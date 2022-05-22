const saveToken = ({ access, refresh }) => {
  if (!process.browser) {
    return null;
  }

  localStorage.setItem('oauth.access_token', access);
  localStorage.setItem('oauth.refresh_token', refresh);
};

const saveUser = (user) => {
  if (!process.browser || !user) {
    return null;
  }

  localStorage.setItem('oauth.user', JSON.stringify(user));
};

const getUser = () => {
  if (!process.browser) {
    return null;
  }

  const userString = localStorage.getItem('oauth.user');
  return userString ? JSON.parse(userString) : null;
}

const getToken = () => {
  if (!process.browser) {
    return null;
  }

  const access = localStorage.getItem('oauth.access_token');
  const refresh = localStorage.getItem('oauth.refresh_token');

  return access && refresh ? { access, refresh } : null;
};

const logout = () => {
  if (!process.browser) {
    return null;
  }

  localStorage.removeItem('oauth.access_token');
  localStorage.removeItem('oauth.refresh_token');
  localStorage.removeItem('oauth.user');
};

const oauth = {
  getToken,
  saveToken,
  getUser,
  saveUser,
  logout,
};

export default oauth;
