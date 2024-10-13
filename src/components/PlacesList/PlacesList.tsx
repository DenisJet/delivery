'use client';
import styles from './PlacesList.module.css';
import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';
import { Swiper as SwiperTypes } from 'swiper/types';
import { ArrowIcon } from './arrow-icon/ArrowIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PlaceCard from '../PlaceCard/PlaceCard';
import { IPlace } from '@/interfaces/place.interface';

interface PlacesListProps {
  places: IPlace[];
}

export const useSliderManagement = (places: IPlace[]) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperTypes | null>(null);

  useEffect(() => {
    if (places.length > 0) {
      setInitialized(true);
    }
  }, [places]);

  useEffect(() => {
    const reinitializeSwiper = () => {
      if (swiperRef.current) {
        swiperRef.current.destroy(true, true);
        setInitialized(false);
        setTimeout(() => setInitialized(true), 0);
      }
    };

    window.addEventListener('resize', reinitializeSwiper);

    return () => {
      window.removeEventListener('resize', reinitializeSwiper);
    };
  }, []);

  const bindRefsToNavigation = (swiper: SwiperTypes) => {
    swiperRef.current = swiper;
    if (swiper.params.navigation && typeof swiper.params.navigation !== 'boolean') {
      if (prevRef.current && nextRef.current) {
        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.navigation.init();
        swiper.navigation.update();
      }
    }
  };

  return { initialized, prevRef, nextRef, bindRefsToNavigation };
};

export default function PlacesList({ places }: PlacesListProps) {
  const { initialized, prevRef, nextRef, bindRefsToNavigation } = useSliderManagement(places);

  return (
    <div className={styles['slider']}>
      {places ? (
        <div className={styles['slider__wrapper']}>
          {initialized && (
            <Swiper
              className={styles['swiper']}
              breakpoints={{
                540: {
                  spaceBetween: 10,
                },
                900: {
                  spaceBetween: 20,
                },
              }}
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={bindRefsToNavigation}
              slidesPerView={'auto'}
            >
              {places.map((place) => {
                return (
                  <SwiperSlide key={place.id} className={styles['swiper-slide']}>
                    <PlaceCard place={place} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          <button ref={prevRef} className={styles['slider__button-prev']}>
            <ArrowIcon />
          </button>
          <button ref={nextRef} className={styles['slider__button-next']}>
            <ArrowIcon rotate='180deg' />
          </button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
