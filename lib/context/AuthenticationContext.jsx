import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import oauth from "../auth";
import api  from "../api";
import { atom, useRecoilState } from "recoil";
import config from "../../config";

export const AuthenticationContext = React.createContext(null);

export const userState = atom({
  key: 'userState',
  default: oauth.getUser(),
})

const openAuthenticationDialog = () => new Promise((resolve, reject) => {
  try {
    const Telegram = window.Telegram;
    Telegram.Login.auth(
      { bot_id: config.botId, request_access: true },
      (data) => {
        return data ? resolve(data) : reject(new Error('Failed to authenticate'));
      }
    )
  } catch (e) {
    reject(e);
  }
});

export const AuthenticationProvider = ({ children }) => {
  const [jwt, setJwt] = useState(oauth.getToken());
  const [user, setUser] = useRecoilState(userState);

  const { error, isFetching, data } = useQuery(
    ['oauth', jwt?.access, jwt?.refresh],
    () => api.oauth.getMe(jwt?.access),
    {
      keepPreviousData: false,
      enabled: jwt != null,
      retry: false,
      refetchInterval: 60_000,
    }
  );

  if (error && !isFetching) {
    const status = error.response?.status;

    if (jwt && status === 401 || status === 403) {
      api.oauth.refresh(jwt.refresh)
        .catch(e => {
          if (e.response?.status !== 500) {
            setJwt(null);
            setUser(null);
            oauth.logout();
          }
        })
    } else {
      setJwt(null);
      setUser(null);
      oauth.logout();
    }
  }

  useEffect(() => {
    if (!error && !isFetching) {
      oauth.saveUser(data);
      setUser(data);
    }
  }, [])

  const context = {
    getUser: () => user,
    updateUser: (user) => setUser(user),
    updateToken: (token) => setJwt(token),
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const { getUser, updateUser: _updateUser, updateToken: _updateToken } = useContext(AuthenticationContext);

  const update = async (jwt) => {
    if (!jwt.access) throw new Error('Failed to authenticate user');

    const user = await api.oauth.getMe(jwt.access);
    if (!user) throw new Error("failed to fetch user");

    _updateUser(user);
    oauth.saveUser(user);
    _updateToken(jwt);
    oauth.saveToken(jwt);
  }

  const logout = async () => {
    await api.oauth.logout(getToken());
    oauth.logout();
    _updateToken(null);
    _updateUser(null);
  }

  const getToken = () => oauth.getToken()?.access;
  const login = async (login, password) => update(await api.oauth.login(login, password));

  const telegramLogin = async () => {
    const telegramData = await openAuthenticationDialog();
    await update(await api.oauth.exchange(telegramData));
  }

  return {
    getUser,
    getToken,
    login,
    telegramLogin,
    logout,
  };
};
