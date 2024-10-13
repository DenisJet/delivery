import { IPlacePrice } from '@/interfaces/place.interface';

export default function TemplateOfPlacePage({ place }: { place: IPlacePrice }) {
  if (!place) return;

  return (
    <div>
      <h2>{place.name}</h2>
      {place.products?.map((product) => {
        return (
          <div key={product.name}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
}
