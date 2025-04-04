import React, { useState, useEffect, useRef } from 'react';
import styles from './ItemsCarousel.module.scss';
import { getAssetSrc } from '@/utils/srcUtils';

interface ItemsCarouselProps {
  items: string[];
  visibleCount: { mobile?: number; tablet?: number; desktop?: number; large?: number };
}

const ItemsCarousel: React.FC<ItemsCarouselProps> = ({ items, visibleCount }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const getVisibleCount = () => {
    if (windowWidth >= 1200) return visibleCount.large || 5;
    if (windowWidth >= 992) return visibleCount.desktop || 4;
    if (windowWidth >= 768) return visibleCount.tablet || 3;
    if (windowWidth >= 576) return visibleCount.mobile || 2; 
    return 1;
  };

  const visibleItems = getVisibleCount();

  const itemWrapperWidth = carouselRef.current ? carouselRef.current.offsetWidth / visibleItems : 0;

  const nextSlide = () => {
    if (carouselRef.current && currentIndex < items.length - visibleItems) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const translateXValue = (currentIndex: number) => {
    return -itemWrapperWidth * currentIndex;
  };

  return (
    <div className={styles.carousel__wrapper}>
      {currentIndex > 0 && (
        <button className={styles.carousel__arrow} onClick={prevSlide}>
          <img src={getAssetSrc('icons/arrow-left.png')} alt="Left arrow" />
        </button>
      )}

      <div className={styles.carousel__container} ref={carouselRef}>
        <div
          className={styles.carousel__carousel}
          style={{
            transform: `translateX(${translateXValue(currentIndex)}px)`,
            width: `${items.length * (100 / visibleItems)}%`,
            transition: 'transform 0.3s ease-in-out',
          }}
        >
          {items.map((item, index) => (
            <div
              className={styles['carousel__item-wrapper']}
              key={index}
              style={{
                width: `${100 / items.length}%`,
              }}
            >
              <img src={item} alt={`slide-${index}`} className={styles.carousel__item} />
            </div>
          ))}
        </div>
      </div>

      {currentIndex < items.length - visibleItems && (
        <button className={styles.carousel__arrow} onClick={nextSlide}>
          <img src={getAssetSrc('icons/arrow-right.png')} alt="Right arrow" />
        </button>
      )}
    </div>

  );
};

export default ItemsCarousel;