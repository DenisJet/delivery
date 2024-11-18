import Image from 'next/image';
import styles from './PlaceCard.module.css';
import Link from 'next/link';
import { IPlace } from '@/interfaces/place.interface';
import { imageLoader } from '@/helpers/helpers';

export default function PlaceCard({ place }: { place: IPlace }) {
  const DEFAULT_IMAGE_URL = '/images/placeholder.png';

  return (
    <Link href={`/${place.slug}`} className={styles.place}>
      <Image
        loader={imageLoader}
        width={125}
        height={75}
        src={place.imageUrl ? place.imageUrl : DEFAULT_IMAGE_URL}
        alt={place.name}
        className={styles.placeImage}
      />
      <p className={styles.placeName}>{place.name}</p>
      <span className={styles.placeAddress}>{place.address}</span>
    </Link>
  );
}
