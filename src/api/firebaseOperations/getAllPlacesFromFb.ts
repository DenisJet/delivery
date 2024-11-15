import { firestore } from '../firebaseConfig';
import { IPlace } from '@/interfaces/place.interface';
import { collection, getDocs } from 'firebase/firestore';

export const getAllPlacesFromFb = async (): Promise<IPlace[]> => {
  const querySnapshot = await getDocs(collection(firestore, 'places'));
  const places: IPlace[] = [];

  querySnapshot.forEach((doc) => {
    const place = doc.data() as IPlace;
    places.push(place);
  });

  return places;
};
