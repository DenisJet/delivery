import { onValue, ref } from 'firebase/database';
import { database } from '../firebaseConfig';

export const getAllPlacesFromFb = async () => {
  const placesRef = ref(database, process.env.NEXT_PUBLIC_PLACES);

  return new Promise((resolve, reject) => {
    onValue(
      placesRef,
      (snapshot) => {
        const places = snapshot.val();
        if (places) {
          resolve(places);
        } else {
          resolve([]);
        }
      },
      (error) => reject(error)
    );
  });
};
