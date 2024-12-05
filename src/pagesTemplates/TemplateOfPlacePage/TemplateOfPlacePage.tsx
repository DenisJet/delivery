'use client';
import { IPlace, IPlacePrice, IProduct } from '@/interfaces/place.interface';
import styles from './TemplateOfPlacePage.module.css';
import { categories } from '@/mockData';
import ProductsList from '@/components/ProductsList/ProductsList';
import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useEffect, useState } from 'react';

export default function TemplateOfPlacePage({ place, products }: { place: IPlace; products: IProduct[] }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (place && products) setIsLoading(false);
  }, []);

  if (!place || !products) return <div>Не удалось загрузить...</div>;

  const subCategories = categories.find((category) => category.name === place?.category)?.subCategories;

  return (
    <div className={styles.place}>
      {isLoading ? (
        <div className={styles.header}>
          <Skeleton width={150} height={30} />
        </div>
      ) : (
        <div className={styles.header}>
          <Link className={styles.link} href='/'>
            <Image src='/images/arrowback.svg' width={25} height={25} alt='назад' />
          </Link>
          <h2 className={styles.placeName}>{place.name}</h2>
        </div>
      )}
      {isLoading
        ? subCategories?.map((subCategory) => (
            <div className={styles.category} key={subCategory}>
              <Skeleton width={200} height={20} />
              <Skeleton count={1} height={250} />
            </div>
          ))
        : subCategories?.map((subCategory) => {
            const sortedProducts = products?.filter((product) => product.category === subCategory);

            return (
              sortedProducts?.length > 0 && (
                <div className={styles.category} key={subCategory}>
                  <h3 className={styles.categoryTitle}>{subCategory}</h3>
                  <ProductsList products={sortedProducts} storeSlug={place.slug} />
                </div>
              )
            );
          })}
    </div>
  );
}
