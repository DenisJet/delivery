import Link from 'next/link';
import styles from './Header.module.css';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { getTotalCartValue, imageLoader } from '@/helpers/helpers';

export default function Header() {
  const cart = useSelector((state: RootState) => state.cart);
  const totalPrice = getTotalCartValue(cart);

  return (
    <div className={styles.header}>
      <Link href='/' className={styles.logo}>
        <Image src='/images/logo.png' width={90} height={40} alt='logo' loader={imageLoader} />
      </Link>
      <button className={styles.search}>Поиск</button>
      <Link href='/cart' className={styles.cart}>
        <Image className={styles.cartImage} src='/images/shoppingbasket.svg' alt='корзина' width={25} height={25} />
        <div className={styles.cartCount}>{totalPrice} ₽</div>
      </Link>
    </div>
  );
}
