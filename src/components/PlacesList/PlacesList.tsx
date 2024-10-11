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

export interface IPlace {
  id: number;
  name: string;
  imageUrl: string;
  address: string;
}

interface PlacesListProps {
  places: IPlace[];
}

export const useSliderManagement = () => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperTypes | null>(null);

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

  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (prevRef.current && nextRef.current) {
        setInitialized(true);
        observer.disconnect();
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const swiperBreakpoints = {
    360: {
      spaceBetween: 4,
    },
    540: {
      spaceBetween: 20,
      slidesPerView: 3,
    },
    690: {
      slidesPerView: 4,
      slidesPerGroup: 3,
    },
    990: {
      slidesPerView: 5,
      slidesPerGroup: 4,
    },
  };

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

  return { initialized, prevRef, nextRef, swiperBreakpoints, bindRefsToNavigation };
};

export default function PlacesList({ places }: PlacesListProps) {
  const { initialized, prevRef, nextRef, swiperBreakpoints, bindRefsToNavigation } = useSliderManagement();

  return (
    <div className={styles['slider']}>
      {places ? (
        <div className={styles['slider__wrapper']}>
          {initialized && (
            <Swiper
              className={styles['swiper']}
              modules={[Navigation]}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={bindRefsToNavigation}
              slidesPerView={'auto'}
              //slidesPerGroup={3}
              //breakpoints={swiperBreakpoints}
            >
              {places.map((place) => {
                return (
                  <SwiperSlide key={place.id} className={styles['swiper-slide']}>
                    <div className={styles.place}>
                      <Image
                        width={125}
                        height={75}
                        src={place.imageUrl}
                        alt={place.name}
                        className={styles.placeImage}
                      />
                      <p className={styles.placeName}>{place.name}</p>
                      <span className={styles.placeAddress}>{place.address}</span>
                    </div>
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
