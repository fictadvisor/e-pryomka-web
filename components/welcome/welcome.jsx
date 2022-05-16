import styles from './welcome.module.css';
import LoginTelegram from "../login-telegram/login-telegram";
import PageLayout from "../layout/PageLayout";
import Script from "next/script";
import config from "../../config";

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

export default function Welcome() {
  const login = e => {
    e.preventDefault()
    openAuthenticationDialog()
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
