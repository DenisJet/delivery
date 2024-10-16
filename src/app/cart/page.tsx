'use client';
import ProductsList from '@/components/ProductsList/ProductsList';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export default function CartPage() {
  const cartStores = useSelector((state: RootState) => state.cart).stores;

  return (
    <div>
      <h2>Корзина</h2>
      {cartStores &&
        cartStores.map((store) => {
          return (
            <div>
              <h3>{store.name}</h3>
              <ProductsList products={store.cart.map((item) => item.product)} />
            </div>
          );
        })}
    </div>
  );
}
