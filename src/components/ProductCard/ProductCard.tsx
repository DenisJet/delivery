import Image from 'next/image';
import styles from './ProductCard.module.css';
import { IProduct } from '@/interfaces/place.interface';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addItem, removeItem } from '@/store/cart.slice';
import { imageLoader } from '@/helpers/helpers';

export default function ProductCard({ product, storeSlug }: { product: IProduct; storeSlug: string }) {
  const cart = useSelector((state: RootState) => state.cart);
  const storeName = product.storeName;
  const count = cart.stores
    .find((store) => store.name === storeName)
    ?.cart.find((item) => item.product.name === product.name)?.count;

  const dispatch = useDispatch();
  const DEFAULT_IMAGE_URL = '/images/placeholder.png';

  const handleAddItem = () => {
    dispatch(addItem({ product, storeSlug }));
  };

  const handleRemoveItem = () => {
    dispatch(removeItem({ product }));
  };

  return (
    <div className={styles.product}>
      <Image
        loader={imageLoader}
        width={75}
        height={75}
        src={product.imageUrl || DEFAULT_IMAGE_URL}
        alt={product.name}
        className={styles.productImage}
      />
      <p className={styles.productPrice}>
        <span>{product.price} ₽</span> <del>{product.oldPrice ? `${product.oldPrice} ₽` : ''}</del>
      </p>
      <p className={styles.productName}>{product.name}</p>
      <p className={styles.productQuantity}>{product.quantity}</p>
      <div className={styles.productButtons}>
        {count && count > 0 && (
          <>
            <button onClick={handleRemoveItem} className={styles.removeButton} type='button'>
              -
            </button>
            <div>{count}</div>
          </>
        )}
        <button onClick={handleAddItem} className={styles.addButton} type='button'>
          +
        </button>
      </div>
    </div>
  );
}
