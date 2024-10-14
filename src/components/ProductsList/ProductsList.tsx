'use client';
import styles from './ProductsList.module.css';
import { useRef, useEffect, useState } from 'react';
import { Swiper as SwiperTypes } from 'swiper/types';
import { ArrowIcon } from '../PlacesList/arrow-icon/ArrowIcon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import PlaceCard from '../PlaceCard/PlaceCard';
import { IPlace, IProduct } from '@/interfaces/place.interface';
import ProductCard from '../ProductCard/ProductCard';

interface ProductsListProps {
  products: IProduct[];
}

export const useSliderManagement = (products: IProduct[]) => {
  const [initialized, setInitialized] = useState<boolean>(false);
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const swiperRef = useRef<SwiperTypes | null>(null);

  useEffect(() => {
    if (products.length > 0) {
      setInitialized(true);
    }
  }, [products]);

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

export default function ProductsList({ products }: ProductsListProps) {
  const { initialized, prevRef, nextRef, bindRefsToNavigation } = useSliderManagement(products);

  return (
    <div className={styles['slider']}>
      {products ? (
        <div className={styles['slider__wrapper']}>
          {initialized && (
            <Swiper
              className={styles['swiper']}
              spaceBetween={0}
              breakpoints={{
                900: {
                  spaceBetween: 5,
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
              {products.map((product) => {
                return (
                  <SwiperSlide key={product.name} className={styles['swiper-slide']}>
                    <ProductCard product={product} />
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
