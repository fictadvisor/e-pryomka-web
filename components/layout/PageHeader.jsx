import Link from "next/link";
import config from "../../config";
import styles from "./PageHeader.module.css";
import LogoutButton from "./LogoutButton";

export default function ({ title, showLogout, onLogout = {} }) {
  return (
    <div className={styles.header}>
      <Link href="/">
        <a className={styles.headerLogo}>
          <img src={config.logo} />
        </a>
      </Link>
      <h1>{title}</h1>
      { showLogout && <LogoutButton/> }
    </div>
  )
}
