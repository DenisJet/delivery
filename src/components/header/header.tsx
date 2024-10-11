import styles from './header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.location}>Адрес доставки</div>
      <div className={styles.search}>Поиск</div>
    </div>
  );
}
