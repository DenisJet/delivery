import { getPlaceBySlugFromFb } from '@/api/firebaseOperations/getPlaceBySlugFromFb';
import { IPlacePrice } from '@/interfaces/place.interface';
import TemplateOfPlacePage from '@/pages/TemplateOfPlacePage/TemplateOfPlacePage';

export default async function Page({ params }: { params: { slug: string } }) {
  const placeData = (await getPlaceBySlugFromFb(params.slug))[0] as IPlacePrice;

  return <TemplateOfPlacePage place={placeData} />;
}
