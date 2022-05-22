import config from "../../config";

export default (api) => ({
  getMe: async (accessToken) => {
    const user = (await api.get('/me', { headers: { Authorization: `Bearer ${accessToken}` } })).data;

    return {
      id: user.id,
      name: user.name,
      role: config.roles[user.role?.toLowerCase() ?? config.roles.user],
      photoUrl: user.photoUrl,
    }
  },
  login: async (login, password) => (await api.post('/login', { login, password })).data,
  refresh: async (refreshToken) => (await api.post('/refresh', { refresh: refreshToken })).data,
  exchange: async (telegramData) => (await api.post('/exchange', telegramData)).data,
  logout: async (accessToken) => (await api.get('/logout', { headers: { Authorization: `Bearer ${accessToken}` } }))
});
