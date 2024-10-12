import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

export const getPlaceBySlugFromFb = async (slug: string) => {
  const placesRef = ref(database, process.env.NEXT_PUBLIC_PLACES);

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
