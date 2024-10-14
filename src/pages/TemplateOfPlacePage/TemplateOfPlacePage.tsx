import { IPlacePrice } from '@/interfaces/place.interface';
import styles from './TemplateOfPlacePage.module.css';
import { categories } from '@/mockData';

export default function TemplateOfPlacePage({ place }: { place: IPlacePrice }) {
  const subCategories = categories.find((category) => category.name === place.category)?.subCategories;

  if (!place) return <div>Не удалось загрузить...</div>;

  return (
    <div className={styles.place}>
      <h2>{place.name}</h2>
      {subCategories?.map((category) => {
        const products = place.products?.filter((product) => product.category === category);

        return (
          <div className={styles.productList}>
            {products &&
              products.map((product) => {
                return (
                  <div className={styles.productCard}>
                    <h3>{product.name}</h3>
                    <p>{product.price}</p>
                    <p>{product.quantity}</p>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}
