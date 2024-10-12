import Image from 'next/image';
import styles from './PlaceCard.module.css';
import { IPlace } from '../PlacesList/PlacesList';

export default function PlaceCard({ place }: { place: IPlace }) {
  const DEFAULT_IMAGE_URL = '/images/placeholder.png';

  return (
    <div className={styles.place}>
      <Image
        width={125}
        height={75}
        src={place.imageUrl ? place.imageUrl : DEFAULT_IMAGE_URL}
        alt={place.name}
        className={styles.placeImage}
      />
      <p className={styles.placeName}>{place.name}</p>
      <span className={styles.placeAddress}>{place.address}</span>
    </div>
  );
}
