import { firestore } from '../firebaseConfig';
import { IPlace } from '@/interfaces/place.interface';
import { doc, getDoc } from 'firebase/firestore';

export const getPlaceBySlugFromFb = async (slug: string): Promise<IPlace | null> => {
  try {
    const docRef = doc(firestore, 'prices', slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as IPlace;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error getting document:', error);
    return null;
  }
};
