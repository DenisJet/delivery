import { CartState, CartStore } from '@/store/cart.slice';

export const getTotalProductCount = (state: CartState): number => {
  return state.stores.reduce((total, store) => {
    return total + store.cart.reduce((storeTotal, item) => storeTotal + item.count, 0);
  }, 0);
};

export const getTotalStoreValue = (store: CartStore) => {
  if (store.cart.length === 0) return;
  return store.cart.reduce((total, item) => {
    return total + parseFloat(item.product.price) * item.count;
  }, 0);
};

export const getTotalCartValue = (state: CartState): number => {
  return state.stores.reduce((total, store) => {
    return (
      total +
      store.cart.reduce((storeTotal, item) => {
        const price = parseFloat(item.product.price); // Преобразование строки в число
        return storeTotal + price * item.count;
      }, 0)
    );
  }, 0);
};
