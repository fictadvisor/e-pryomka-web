import Head from "next/head";
import config from "../../config";
import PageHeader from "./PageHeader";
import styles from './PageLayout.module.css';
import Footer from "./Footer";

export default function PageLayout({ meta, title, header = true, logout = false, children }) {
  const metaTitle = meta.title ?? title

  return (
    <div className={styles.page}>
      <Head>
        <title>{title ?? meta.title}</title>
        <meta name="viewport" content="width=device-width, target-densityDpi=device-dpi" />

        <meta property="og:title" content={metaTitle} />
        <meta property="og:site_name" content={config.service} />
        <meta property="og:image" content="/assets/preview.jpg" />
        <meta property="og:type" content="website" />

        <link rel="icon" href="/images/favicon.ico"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <header className={styles.header}>
        { header && <PageHeader title={title ?? meta.title} showLogout={logout}/> }
      </header>
      <div className={styles.content}>{children}</div>
      <footer className={styles.footer}>
        <Footer/>
      </footer>
    </div>
  )
}
