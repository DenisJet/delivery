import Image from 'next/image';
import styles from './ProductCard.module.css';
import { IProduct } from '@/interfaces/place.interface';
import { useState } from 'react';

export default function ProductCard({ product }: { product: IProduct }) {
  const [counter, setCounter] = useState(0);
  const DEFAULT_IMAGE_URL = '/images/placeholder.png';

  return (
    <div className={styles.product}>
      <Image
        width={75}
        height={75}
        src={product.imageUrl ? product.imageUrl : DEFAULT_IMAGE_URL}
        alt={product.name}
        className={styles.productImage}
      />
      <p className={styles.productPrice}>{product.price} p</p>
      <p className={styles.productName}>{product.name}</p>
      <p className={styles.productQuantity}>{product.quantity}</p>
      <div className={styles.productButtons}>
        {counter > 0 && (
          <>
            <button onClick={() => setCounter(counter - 1)} className={styles.removeButton} type='button'>
              -
            </button>
            <div>{counter}</div>{' '}
          </>
        )}
        <button onClick={() => setCounter(counter + 1)} className={styles.addButton} type='button'>
          +
        </button>
      </div>
    </div>
  );
}
