import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (<>
    <p>Розроблено студентами ФІОТ для абітурієнтів ФІОТ. 🐊. 2022</p>
    <h3 className={styles.contactsHeader}>Контакти</h3>
    <div className={styles.contactContainer}>
      <div className={styles.contact}>
        <a href='https://github.com/fictadvisor'>
          <Image src='/images/github.png'
                 width="15px"
                 height="15px"/>
          <p>Вихідний код</p>
        </a>
      </div>
      <div className={styles.contact}>
        <a href='https://t.me/fict_time'>
          <Image src='/images/fict_time.jpg'
                 width="15px"
                 height="15px"/>
          <p>СтудРада ФІОТ</p>
        </a>
      </div>
      <div className={styles.contact}>
        <a href='https://t.me/alegator1209'>
          <Image src='/images/telegram2.png'
                 width="15px"
                 height="15px"/>
          <p>Telegram</p>
        </a>
      </div>
      <div className={styles.contact}>
        <a href='https://t.me/abit_fiot'>
          <Image src='/images/abit_fiot.jpg'
                 width="15px"
                 height="15px"/>
          <p>Абітурієнт ФІОТ</p>
        </a>
      </div>
    </div>
  </>)
}