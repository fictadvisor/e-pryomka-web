import { useAuthentication } from "../lib/context/AuthenticationContext";
import AuthPageLayout from "../components/layout/AuthPageLayout";
import config from "../config";

export default function Dashboard() {
  const authentication = useAuthentication();
  const user = authentication.getUser();

  const titles = {
    [config.roles.admin]: 'Панель адміністратора',
    [config.roles.operator]: 'Панель оператора',
    [config.roles.user]: 'Панель користувача'
  }

  return (<AuthPageLayout meta={{ title: 'Панель користувача' }} title={titles[user?.role]}>
    {
      user ? <>
        <p>{user.id}</p>
        <p>{user.name}</p>
      </> : "Не авторизовано"
    }
  </AuthPageLayout>)
}