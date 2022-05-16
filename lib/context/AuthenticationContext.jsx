import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import oauth from "../auth";
import api  from "../api";
import { useRouter } from "next/router";

export const AuthenticationContext = React.createContext(null);

export const AuthenticationProvider = ({ children }) => {
  const [jwt, setJwt] = useState(oauth.getToken());

  const { error, isFetching } = useQuery(
    ['oauth', jwt?.accessToken, jwt?.refreshToken],
    () => api.oauth.getMe(jwt?.accessToken),
    { keepPreviousData: false, enabled: jwt !== null, retry: false }
  );

  if (error && !isFetching) {
    const status = error.response?.status;

    if (jwt && status === 401 || status === 403) {
      oauth.refresh(setJwt)
        .catch(e => {
          if (e.response?.status !== 500) {
            oauth.logout();
          }
        })
    } else {
      oauth.logout();
    }
  }

  const context = {
    update: (token) => setJwt(token),
  };

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
};

// const loginUrl = `https://t.me/${config.contacts.bot}?start=login`;
const logoutUrl = '/oauth?logout=true'

export const useAuthentication = () => {
  const router = useRouter();

  const logout = () => router.push(logoutUrl);
  const getToken = () => oauth.getToken()?.accessToken;
  const getUser = () => oauth.getUser();
  const { update: _update } = useContext(AuthenticationContext);
  const update = () => _update(oauth.getToken());
  const login = async (login, password) => {
    await oauth.login(login, password);
    update();
  }

  return {
    getUser,
    update,
    getToken,
    // loginUrl,
    logoutUrl,
    login,
    logout,
  };
};
