import styles from './welcome.module.css';
import LogInTelegram from "../login-telegram/login-telegram";
import {useRouter} from "next/router";

export default function Welcome() {
  const router = useRouter()

  const login = e => {
    e.preventDefault()
    router.push('/wip')
  }

  return (
    <div className={styles.welcomeContent}>
      <header className={styles.welcomeHeader}>
        <h1>FICT Advisor</h1>
        <h2>Vstup</h2>
      </header>
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
          <LogInTelegram onClick={login}/>
        </div>
      </div>
    </div>
  );
}
