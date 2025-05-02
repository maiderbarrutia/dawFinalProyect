import React, { useState } from 'react';
import { getAssetSrc, getUploadedImageSrc } from '@/utils/srcUtils';
import styles from './MediaSlider.module.scss';

interface MediaSliderProps {
  images: string[];
  videos: string[];
}

const MediaSlider: React.FC<MediaSliderProps> = ({ images, videos }) => {
  // Unificar las imágenes y videos en un solo array
  const media = [
    ...images.map((image, index) => ({ type: 'image', src: getUploadedImageSrc(`images/${image}`), alt: `Imagen ${index + 1}` })),
    ...videos.map((video, index) => ({ type: 'video', src: getUploadedImageSrc(`videos/${video}`), alt: `Video ${index + 1}` }))
  ];

  // Estado para manejar el índice del medio actual
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextMedia = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % media.length); // Siguiente media
  };

  const prevMedia = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + media.length) % media.length); // Media anterior
  };

  return (
    <div className={styles['slider-container']}>
      <div className={styles['slider-container__content']}>
        {media.length > 0 && (
          <div className={styles['slider-container__media-wrapper']}>
            {media[currentIndex].type === 'image' ? (
              <img
                src={media[currentIndex].src}
                alt={media[currentIndex].alt}
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = getAssetSrc('images/default-image.jpg');
                }}
                className={styles['slider-container__image']}
              />
            ) : (
              <div className={styles['slider-container__video-wrapper']}>
                <video controls className={styles['slider-container__video-element']}>
                  <source src={media[currentIndex].src} type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Botones de navegación */}
      {media.length > 1 && (
        <div className={styles['slider-container__navigation-buttons']}>
          <button className={styles['slider-container__nav-button']} onClick={prevMedia}>
            <img src={getAssetSrc('icons/arrow-left.png')} alt="Anterior" />
          </button>
          <button className={styles['slider-container__nav-button']} onClick={nextMedia}>
            <img src={getAssetSrc('icons/arrow-right.png')} alt="Siguiente" />
          </button>
        </div>
        )}
    </div>
  );
};

export default MediaSlider;
