import { equalTo, onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

export const getPlacesByCategoryFromFb = async (category: string) => {
  const placesRef = ref(database, process.env.NEXT_PUBLIC_PLACES);

  return new Promise((resolve, reject) => {
    const placesQuery = query(placesRef, orderByChild('category'), equalTo(category));
    onValue(
      placesQuery,
      (snapshot) => {
        const places = snapshot.val();
        if (places) {
          resolve(Object.values(places));
        } else {
          resolve([]);
        }
      },
      (error) => reject(error)
    );
  });
};
