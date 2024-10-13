import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { IPlacePrice } from '@/interfaces/place.interface';

export const getPlaceBySlugFromFb = async (slug: string): Promise<IPlacePrice[]> => {
  const placesRef = ref(database, process.env.NEXT_PUBLIC_PRICES);

  return new Promise((resolve, reject) => {
    const placeQuery = query(placesRef, orderByChild('slug'), equalTo(slug));
    onValue(
      placeQuery,
      (snapshot) => {
        const place = snapshot.val();
        if (place) {
          resolve(Object.values(place));
        } else {
          resolve([]);
        }
      },
      (error) => reject(error)
    );
  });
};
