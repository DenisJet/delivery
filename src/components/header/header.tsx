import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTotalProductCount } from '@/helpers/helpers';

export default function Header() {
  const cart = useSelector((state: RootState) => state.cart);
  const totalCount = getTotalProductCount(cart);

  return (
    <div className={styles.header}>
      <Link href='/' className={styles.logo}>
        LOGO
      </Link>
      <div className={styles.search}>Поиск</div>
      <div className={styles.cart}>
        <Image src='/images/shoppingbasket.svg' alt='корзина' width={30} height={30} />
        <div className={styles.cartCount}>{totalCount}</div>
      </div>
    </div>
  );
}
