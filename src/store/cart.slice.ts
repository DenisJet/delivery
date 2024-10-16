import { IProduct } from '@/interfaces/place.interface';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartStore {
  name: string;
  cart: { product: IProduct; count: number }[];
}

export interface CartState {
  stores: CartStore[];
}

const initialState: CartState = {
  stores: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clean: (state) => {
      state.stores = [];
    },
    removeStore: (state, action: PayloadAction<string>) => {
      state.stores = state.stores.filter((store) => store.name !== action.payload);
    },
    addItem: (state, action: PayloadAction<{ product: IProduct }>) => {
      const store = state.stores.find((store) => store.name === action.payload.product.storeName);

      if (!store) {
        state.stores.push({
          name: action.payload.product.storeName,
          cart: [{ product: action.payload.product, count: 1 }],
        });
        return;
      }

      const product = store.cart.find((item) => item.product.name === action.payload.product.name);

      if (!product) {
        store.cart.push({ product: action.payload.product, count: 1 });
      } else {
        product.count += 1;
      }
    },
    removeItem: (state, action: PayloadAction<{ product: IProduct }>) => {
      const store = state.stores.find((store) => store.name === action.payload.product.storeName);
      if (store) {
        const productIndex = store.cart.findIndex((item) => item.product.name === action.payload.product.name);
        if (productIndex !== -1) {
          const product = store.cart[productIndex];
          if (product.count === 1) {
            store.cart.splice(productIndex, 1);
          } else {
            product.count -= 1;
          }
        }
      }
    },
  },
});

export const { clean, removeStore, addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
