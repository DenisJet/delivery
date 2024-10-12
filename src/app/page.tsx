import PlacesList from '@/components/PlacesList/PlacesList';
import styles from './page.module.css';
import { mockDataProductsStore } from '@/mockData';
import { getAllPlacesFromFb } from '@/api/firebaseOperations/getAllPlacesFromFb';

export default async function Home() {
  const places = await getAllPlacesFromFb();

  return (
    <div className={styles.home}>
      <div className={styles.category}>
        <h2 className={styles.categoryTitle}>Продукты</h2>
        <PlacesList places={places ? Object.values(places) : []} />
      </div>
    </div>
  );
}
