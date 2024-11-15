'use client';
import ProductsList from '@/components/ProductsList/ProductsList';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import styles from './page.module.css';
import { getTotalCartValue, getTotalStoreValue } from '@/helpers/helpers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const [activeCart, setActiveCart] = useState('');
  const cart = useSelector((state: RootState) => state.cart);
  const activeStore = cart.stores.find((store) => store.name === activeCart);
  const totalPrice = activeStore ? getTotalStoreValue(activeStore) : 0;

  useEffect(() => {
    if (cart.stores[0] !== undefined) setActiveCart(cart.stores[0].name);
  }, [cart]);

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <Link className={styles.link} href='/'>
          <Image src='/images/arrowback.svg' width={30} height={30} alt='назад' />
        </Link>
        <h2 className={styles.cartTitle}>Корзина</h2>
      </div>
      <div className={styles.cartTabs}>
        {cart.stores.length > 0
          ? cart.stores.map((store) => {
              return (
                <h3
                  key={store.name}
                  onClick={() => setActiveCart(store.name)}
                  className={
                    activeCart === store.name ? `${styles.cartTabActive} ${styles.cartTab}` : `${styles.cartTab}`
                  }
                >
                  {store.name}
                </h3>
              );
            })
          : ''}
      </div>
      {cart.stores.length > 0 ? (
        cart.stores.map((store) => {
          if (store.cart.length <= 0) return;
          return (
            <div
              key={store.name}
              className={activeCart === store.name ? `${styles.storeActive} ${styles.store}` : `${styles.store}`}
            >
              <ProductsList products={store.cart.map((item) => item.product)} />
            </div>
          );
        })
      ) : (
        <div className={styles.storeName}>Корзина пуста</div>
      )}
      {cart.stores.length > 0 && (
        <button type='button' className={styles.cartButton}>
          Перейти к оплате {totalPrice} ₽
        </button>
      )}
    </div>
  );
}
