import { useRouter } from "next/router";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import PageLayout from "./PageLayout";

export default function AuthPageLayout({ role = '*', ...props }) {
  const router = useRouter();
  const authentication = useAuthentication();

  if (process.browser && authentication.getUser() == null) {
    router.push('/');
  }

  return <PageLayout logout {...props}/>
}
