import { getPlaceBySlugFromFb } from '@/api/firebaseOperations/getPlaceBySlugFromFb';
import { getProductsFromFb } from '@/api/firebaseOperations/getProductsFromFb';
import { IPlace, IPlacePrice, IProduct } from '@/interfaces/place.interface';
import TemplateOfPlacePage from '@/pages/TemplateOfPlacePage/TemplateOfPlacePage';

export default async function Page({ params }: { params: { slug: string } }) {
  const placeData = (await getPlaceBySlugFromFb(params.slug)) as IPlace;
  const productsData = (await getProductsFromFb(params.slug)) as IProduct[];

  return <TemplateOfPlacePage place={placeData} products={productsData} />;
}
