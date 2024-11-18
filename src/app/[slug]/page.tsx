import { getAllPlacesFromFb } from '@/api/firebaseOperations/getAllPlacesFromFb';
import { getPlaceBySlugFromFb } from '@/api/firebaseOperations/getPlaceBySlugFromFb';
import { getProductsFromFb } from '@/api/firebaseOperations/getProductsFromFb';
import { IPlace, IPlacePrice, IProduct } from '@/interfaces/place.interface';
import { allPlaces, prices } from '@/mockData';
import TemplateOfPlacePage from '@/pagesTemplates/TemplateOfPlacePage/TemplateOfPlacePage';

export async function generateStaticParams() {
  const allPlaces = await getAllPlacesFromFb();

  const slugs = allPlaces.map((place) => place.slug);

  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export default async function Page({ params }: { params: { slug: string } }) {
  const placeData = (await getPlaceBySlugFromFb(params.slug)) as IPlace;
  const productsData = (await getProductsFromFb(params.slug)) as IProduct[];

  if (!placeData || !productsData) {
    return 'Данные не найдены';
  }

  return <TemplateOfPlacePage place={placeData} products={productsData} />;
}
