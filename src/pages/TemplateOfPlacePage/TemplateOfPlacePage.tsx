import { IPlacePrice } from '@/interfaces/place.interface';
import styles from './TemplateOfPlacePage.module.css';

export default function TemplateOfPlacePage({ place }: { place: IPlacePrice }) {
  if (!place) return;

  return (
    <div className={styles.place}>
      <h2>{place.name}</h2>
      {place.products?.map((product) => {
        return (
          <div key={product.name}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
}
