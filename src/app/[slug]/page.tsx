import { getPlaceBySlugFromFb } from '@/api/firebaseOperations/getPlaceBySlugFromFb';
import { getProductsFromFb } from '@/api/firebaseOperations/getProductsFromFb';
import { IPlace, IPlacePrice, IProduct } from '@/interfaces/place.interface';
import { allPlaces, prices } from '@/mockData';
import TemplateOfPlacePage from '@/pagesTemplates/TemplateOfPlacePage/TemplateOfPlacePage';

export default async function Page({ params }: { params: { slug: string } }) {
  // const placeData = (await getPlaceBySlugFromFb(params.slug)) as IPlace;
  // const productsData = (await getProductsFromFb(params.slug)) as IProduct[];
  const placeData = allPlaces.find((place) => place.slug === params.slug);
  const productsData = prices.find((price) => price.slug === params.slug);

  if (!placeData || !productsData?.products) {
    return 'Данные не найдены';
  }

  return <TemplateOfPlacePage place={placeData} products={productsData.products} />;
}
