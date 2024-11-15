import { IProduct } from '@/interfaces/place.interface';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';

export const getProductsFromFb = async (placeName: string): Promise<IProduct[]> => {
  const querySnapshot = await getDocs(collection(firestore, 'prices', placeName, 'products'));
  const products: IProduct[] = [];

  querySnapshot.forEach((doc) => {
    const product = doc.data() as IProduct;
    products.push(product);
  });

  return products;
};
