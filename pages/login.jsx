import PageLayout from "../components/layout/PageLayout";
import LoginForm from "../components/login-form/LoginForm";
import { useAuthentication } from "../lib/context/AuthenticationContext";
import { useRouter } from "next/router";

export default function Login() {
  const authentication = useAuthentication();
  const router = useRouter()

  if (process.browser && authentication.getUser() != null) {
    router.push('/dashboard');
  }

  return (
    <PageLayout
      meta={{ title: "Увійти до системи" }}>
      <LoginForm authentication={authentication} onLogin={() => router.push('/dashboard')}/>
    </PageLayout>
  )
}