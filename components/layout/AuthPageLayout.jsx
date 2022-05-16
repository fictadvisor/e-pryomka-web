import { useRouter } from "next/router";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import config from "../../config";
import PageLayout from "./PageLayout";
import { useEffect, useState } from "react";

export default function AuthPageLayout({ role = '*', ...props }) {
  const router = useRouter();
  const authentication = useAuthentication();
  const [authorized, setAuthorized] = useState(false);
  const user = authentication.getUser();

  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => setAuthorized(false);
    router.events.on('routeChangeStart', hideContent);
    router.events.on('routeChangeComplete', authCheck)
    return () => {
      router.events.off('routeChangeStart', hideContent);
      router.events.off('routeChangeComplete', authCheck);
    }
  }, []);

  function authCheck() {
    if (!user || (user.role !== role && role !== '*')) {
      setAuthorized(false);
      router.push((role === config.roles.user) || (role === '*') ? '/' : '/login',);
    } else {
      setAuthorized(true);
    }
  }

  return (authorized && <PageLayout {...props}/>);
}
