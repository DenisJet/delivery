import Image from 'next/image';
import styles from './ProductCard.module.css';
import { IProduct } from '@/interfaces/place.interface';

export default function ProductCard({ product }: { product: IProduct }) {
  const DEFAULT_IMAGE_URL = '/images/placeholder.png';

  return (
    <div className={styles.product}>
      <Image
        width={125}
        height={75}
        src={product.imageUrl ? product.imageUrl : DEFAULT_IMAGE_URL}
        alt={product.name}
        className={styles.productImage}
      />
      <p className={styles.productName}>{product.name}</p>
      <span className={styles.productAddress}>{product.price}</span>
      <span className={styles.productAddress}>{product.quantity}</span>
    </div>
  );
}
