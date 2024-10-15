import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link href='/' className={styles.logo}>
        LOGO
      </Link>
      <div className={styles.search}>Поиск</div>
      <div className={styles.cart}>Корзина</div>
    </div>
  );
}
