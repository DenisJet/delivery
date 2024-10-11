import PlacesList from '@/components/PlacesList/PlacesList';
import styles from './page.module.css';
import { mockDataProductsStore } from '@/mockData';

export default function Home() {
  return (
    <div className={styles.home}>
      <PlacesList places={mockDataProductsStore} />
    </div>
  );
}
