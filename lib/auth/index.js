import api from "../api";

const saveToken = ({ access, refresh }) => {
  if (!process.browser) {
    return null;
  }

  localStorage.setItem('oauth.access_token', access);
  localStorage.setItem('oauth.refresh_token', refresh);
};

const saveUser = (user) => {
  if (!process.browser) {
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

  const accessToken = localStorage.getItem('oauth.access_token');
  const refreshToken = localStorage.getItem('oauth.refresh_token');

  return accessToken && refreshToken ? { accessToken, refreshToken } : null;
};

const logout = () => {
  if (!process.browser) {
    return null;
  }

  localStorage.removeItem('oauth.access_token');
  localStorage.removeItem('oauth.refresh_token');
  localStorage.removeItem('oauth.user');
};

async function login(login, password) {
  if (!process.browser) {
    return null;
  }

  const jwt = await api.oauth.login(login, password);
  if (jwt.access) {
    const me = await api.oauth.getMe(jwt.access);
    saveUser(me);
  }
  saveToken(jwt);
}

async function refresh() {
  if (!process.browser) {
    return null;
  }

  const { refreshToken } = getToken();
  const jwt = await api.oauth.refresh(refreshToken);
  const me = await api.oauth.getMe(jwt.access);
  saveUser(me);
  saveToken(jwt);
}

const oauth = {
  getToken,
  getUser,
  login,
  refresh,
  logout,
};

export default oauth;
