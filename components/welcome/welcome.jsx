import styles from './welcome.module.css';
import LoginTelegram from "../login-telegram/login-telegram";
import PageLayout from "../layout/PageLayout";
import Script from "next/script";
import { useAuthentication } from "../../lib/context/AuthenticationContext";
import { useRouter } from "next/router";

export default function Welcome() {
  const authentication = useAuthentication();
  const router = useRouter();

  const onLogin = () => router.push('/dashboard');

  const login = e => {
    e.preventDefault()
    authentication.telegramLogin()
      .then(onLogin)
      .catch(e => alert(e.message));
  }

  return (
    <PageLayout
      meta={{ title: 'Welcome to FICT! 🚀' }}
      header={false}>

      <Script async src="https://telegram.org/js/telegram-widget.js"/>

      <div className={styles.welcomeContent}>
        <h1 className={styles.welcomeTitle}>Welcome to FICT! 🚀</h1>
        <div className={styles.welcomeDesc}>
          <p>Ласкаво просимо на ФІОТ! Ця електронна система допоможе тобі правильно та комфортно подати документи і долучитися до найкращого технічного факультету країни.</p>
          <ul>
            <li>Зроблено студентами для абітурієнтів</li>
            <li>Зручний перегляд статусу заявки</li>
            <li>Підказки при заповнені документів</li>
            <li>Безпечне збереження даних</li>
            <li>Подай усе не виходячи з дому</li>
          </ul>
          <div className={styles.loginTelegram}>
            <LoginTelegram onClick={login}/>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
