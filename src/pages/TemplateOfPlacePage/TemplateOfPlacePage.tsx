import { IPlace } from '@/interfaces/place.interface';

export default function TemplateOfPlacePage({ place }: { place: IPlace }) {
  return (
    <div>
      <h2>{place.name}</h2>
    </div>
  );
}
