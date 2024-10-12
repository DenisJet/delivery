import PlacesList from '@/components/PlacesList/PlacesList';
import styles from './page.module.css';
import { mockDataCategories } from '@/mockData';
import { getAllPlacesFromFb } from '@/api/firebaseOperations/getAllPlacesFromFb';
import { IPlace } from '@/interfaces/place.interface';

export default async function Home() {
  const allPlaces = await getAllPlacesFromFb();
  const categories = mockDataCategories;

  return (
    <div className={styles.home}>
      {categories.map((category) => {
        const places = allPlaces
          ? Object.values(allPlaces).filter((place: IPlace) => place.category === category.category)
          : [];

        return (
          places.length > 0 && (
            <div className={styles.category} key={category.id}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <PlacesList places={places} />
            </div>
          )
        );
      })}
    </div>
  );
}
