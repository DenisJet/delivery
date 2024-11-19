'use client';
import { RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import styles from './page.module.css';
import { getTotalStoreValue } from '@/helpers/helpers';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CartProductList } from '@/components/CartProductList/CartProductList';
import { removeStore } from '@/store/cart.slice';
import Modal from '@/components/Modal/Modal';

export default function CartPage() {
  const [activeCart, setActiveCart] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();

  const cart = useSelector((state: RootState) => state.cart);
  const activeStore = cart.stores.find((store) => store.name === activeCart);
  const totalPrice = activeStore ? getTotalStoreValue(activeStore) : 0;

  useEffect(() => {
    if (cart.stores[0] !== undefined) setActiveCart(cart.stores[0].name);
  }, [cart]);

  const deleteOrder = () => {
    setModalIsOpen(false);
    dispatch(removeStore(activeCart));
  };

  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <Link className={styles.link} href='/'>
          <Image src='/images/arrowback.svg' width={25} height={25} alt='назад' />
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
        <div>
          <div className={styles.orderHeader}>
            <h2 className={styles.orderTitle}>Заказ</h2>
            <Image
              onClick={() => setModalIsOpen(true)}
              className={styles.orderTrash}
              src='/images/trash.svg'
              width={25}
              height={25}
              alt='удалить заказ'
            />
          </div>
          {cart.stores.map((store) => {
            if (store.cart.length <= 0) return;
            return (
              <div
                key={store.name}
                className={activeCart === store.name ? `${styles.storeActive} ${styles.store}` : `${styles.store}`}
              >
                <CartProductList
                  products={store.cart.map((item) => item.product)}
                  storeSlug={activeStore ? activeStore.storeSlug : ''}
                />
              </div>
            );
          })}
        </div>
      ) : (
        <div className={styles.storeName}>Корзина пуста</div>
      )}
      {cart.stores.length > 0 && (
        <>
          <Link className={styles.storeLink} href={activeStore ? activeStore.storeSlug : ''}>
            Перейти в магазин
          </Link>
          <button type='button' className={styles.cartButton}>
            Перейти к оплате {totalPrice} ₽
          </button>
        </>
      )}
      {modalIsOpen && (
        <Modal onClose={() => setModalIsOpen(false)} shouldDisableScroll>
          <div>
            <p>Удалить заказ?</p>
            <button type='button' onClick={() => setModalIsOpen(false)}>
              Нет
            </button>
            <button type='button' onClick={deleteOrder}>
              Да
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
