import { onValue, ref } from 'firebase/database';
import { database } from '../firebaseConfig';
import { IPlace } from '@/interfaces/place.interface';

export const getAllPlacesFromFb = async (): Promise<IPlace[]> => {
  const placesRef = ref(database, process.env.NEXT_PUBLIC_PLACES);

  return new Promise((resolve, reject) => {
    onValue(
      placesRef,
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
