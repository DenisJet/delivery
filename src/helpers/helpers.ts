import { CartState } from '@/store/cart.slice';

export const getTotalProductCount = (state: CartState): number => {
  return state.stores.reduce((total, store) => {
    return total + store.cart.reduce((storeTotal, item) => storeTotal + item.count, 0);
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
