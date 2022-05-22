import { useAuthentication, userState } from "../lib/context/AuthenticationContext";
import AuthPageLayout from "../components/layout/AuthPageLayout";
import config from "../config";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";

const titles = {
  [config.roles.admin]: 'Панель адміністратора',
  [config.roles.operator]: 'Панель оператора',
  [config.roles.user]: 'Панель користувача'
}

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const authentication = useAuthentication();

  useEffect(() => {
    setUser(authentication.getUser());
  }, []);

  return (<AuthPageLayout meta={{ title: 'Панель користувача' }} title={titles[user?.role]}>
    <>
      <p>{user?.id}</p>
      <p>{user?.name}</p>
    </>
  </AuthPageLayout>)
}
