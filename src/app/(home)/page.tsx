'use client';
import React, { useEffect, useState } from 'react';
import PlacesList from '@/components/PlacesList/PlacesList';
import styles from './page.module.css';
import { categories } from '@/mockData';
import { getAllPlacesFromFb } from '@/api/firebaseOperations/getAllPlacesFromFb';
import { IPlace } from '@/interfaces/place.interface';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function HomePage() {
  const [allPlaces, setAllPlaces] = useState<IPlace[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const placesData = await getAllPlacesFromFb();
        setAllPlaces(Object.values(placesData));
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  return (
    <div className={styles.home}>
      {isLoading
        ? categories.map((category) => (
            <div className={styles.category} key={category.name}>
              <h2 className={styles.categoryTitle}>
                <Skeleton width={200} />
              </h2>
              <Skeleton count={1} height={100} />
            </div>
          ))
        : categories.map((category) => {
            const places = allPlaces?.filter((place: IPlace) => place.category === category.name) || [];

            return (
              places.length > 0 && (
                <div className={styles.category} key={category.name}>
                  <h2 className={styles.categoryTitle}>{category.name}</h2>
                  <PlacesList places={places} />
                </div>
              )
            );
          })}
    </div>
  );
}
