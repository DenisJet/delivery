import { IPlacePrice } from '@/interfaces/place.interface';
import styles from './TemplateOfPlacePage.module.css';
import { categories } from '@/mockData';
import ProductsList from '@/components/ProductsList/ProductsList';

export default function TemplateOfPlacePage({ place }: { place: IPlacePrice }) {
  const subCategories = categories.find((category) => category.name === place?.category)?.subCategories;

  if (!place) return <div>Не удалось загрузить...</div>;

  return (
    <div className={styles.place}>
      <h2 className={styles.placeName}>{place.name}</h2>
      {subCategories?.map((subCategory) => {
        const products = place.products?.filter((product) => product.category === subCategory);

        return (
          products &&
          products.length > 0 && (
            <div className={styles.category} key={subCategory}>
              <h3 className={styles.categoryTitle}>{subCategory}</h3>
              <ProductsList products={products} />
            </div>
          )
        );
      })}
    </div>
  );
}
