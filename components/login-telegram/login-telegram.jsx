import styles from './login-telegram.module.css';
import Image from "next/image";

export default function LoginTelegram({ onClick, text }) {
  return (
    <button onClick={onClick} className={styles.logInButton}>
      <div>
        <Image
            src="/images/telegram.png"
            width="30px"
            height="30px"
        />
      </div>
      <p>{text ?? "Увійти через Telegram"}</p>
    </button>
  );
}
