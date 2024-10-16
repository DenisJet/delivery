import PlacesList from '@/components/PlacesList/PlacesList';
import styles from './page.module.css';
import { categories } from '@/mockData';
import { getAllPlacesFromFb } from '@/api/firebaseOperations/getAllPlacesFromFb';
import { IPlace } from '@/interfaces/place.interface';

export default async function HomePage() {
  const allPlaces = await getAllPlacesFromFb();

  return (
    <div className={styles.home}>
      {categories.map((category) => {
        const places = allPlaces
          ? Object.values(allPlaces).filter((place: IPlace) => place.category === category.name)
          : [];

        return (
          places.length > 0 && (
            <div className={styles.category} key={category.name}>
              <h2 className={styles.categoryTitle}>{category.name}</h2>
              <PlacesList places={places} />
            </div>
          )
        );
      })}
    </div>
  );
}
