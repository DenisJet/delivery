import PlacesList from '@/components/PlacesList/PlacesList';
import styles from './page.module.css';
import { mockDataProductsStore } from '@/mockData';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.category}>
        <h2 className={styles.categoryTitle}>Продукты</h2>
        <PlacesList places={mockDataProductsStore} />
      </div>
    </div>
  );
}
