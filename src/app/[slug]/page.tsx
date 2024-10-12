import { getPlaceBySlugFromFb } from '@/api/firebaseOperations/getPlaceBySlugFromFb';
import { IPlace } from '@/interfaces/place.interface';
import TemplateOfPlacePage from '@/pages/TemplateOfPlacePage/TemplateOfPlacePage';

export default async function Page({ params }: { params: { slug: string } }) {
  const placeData = (await getPlaceBySlugFromFb(params.slug)) as IPlace[];

  return <TemplateOfPlacePage place={placeData[0]} />;
  // return <p>{placeData[0].name}</p>;
}
