import { IProduct } from '@/interfaces/place.interface';
import styles from './CartProductList.module.css';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { addItem, removeItem } from '@/store/cart.slice';
import { imageLoader } from '@/helpers/helpers';

interface ProductsListProps {
  storeSlug: string;
  products: IProduct[];
}

export const CartProductList = ({ products, storeSlug }: ProductsListProps) => {
  const DEFAULT_IMAGE_URL = '/images/placeholder.png';
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleAddItem = (product: IProduct) => {
    dispatch(addItem({ product, storeSlug }));
  };

  const handleRemoveItem = (product: IProduct) => {
    dispatch(removeItem({ product }));
  };

  return (
    <ul className={styles.productList}>
      {products &&
        products.length > 0 &&
        products.map((product) => {
          const storeName = product.storeName;
          const count = cart.stores
            .find((store) => store.name === storeName)
            ?.cart.find((item) => item.product.name === product.name)?.count;
          const allPrice = count ? Number(product.price) * count : '';

          return (
            <div className={styles.productItem}>
              <Image
                loader={imageLoader}
                className={styles.productImage}
                src={product.imageUrl ? product.imageUrl : DEFAULT_IMAGE_URL}
                alt='товар'
                width={75}
                height={75}
              />
              <div className={styles.productDescription}>
                <h4 className={styles.productName}>{product.name}</h4>
                {product.description && <p className={styles.productText}>{product.description}</p>}
                <div className={styles.productPrice}>
                  <span>{product.price}₽</span> <del>{product.oldPrice ? `${product.oldPrice} ₽` : ''}</del> -{' '}
                  {product.quantity}
                </div>
              </div>
              <div className={styles.productCount}>
                <div className={styles.productButtons}>
                  {count && count > 0 && (
                    <>
                      <button onClick={() => handleRemoveItem(product)} className={styles.removeButton} type='button'>
                        -
                      </button>
                      <div>{count}</div>
                    </>
                  )}
                  <button onClick={() => handleAddItem(product)} className={styles.addButton} type='button'>
                    +
                  </button>
                </div>
                <p className={styles.allPrice}>{allPrice ? `${allPrice} ₽` : ''}</p>
              </div>
            </div>
          );
        })}
    </ul>
  );
};
