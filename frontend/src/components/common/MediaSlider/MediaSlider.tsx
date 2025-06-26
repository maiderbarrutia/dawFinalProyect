import React, { useState } from 'react';
import { getAssetSrc, getUploadedImageSrc } from '@/utils/srcUtils';
import styles from './MediaSlider.module.scss';

interface MediaSliderProps {
  images: string[];
  videos: string[];
}

const MediaSlider: React.FC<MediaSliderProps> = ({ images, videos }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const buildSrc = (path: string, type: 'images' | 'videos') => {
    return path.startsWith('http://') || path.startsWith('https://')
      ? path
      : getUploadedImageSrc(`${type}/${path}`);
  };

  const media = [
    ...images.map((img, i) => ({
      type: 'image',
      src: buildSrc(img, 'images'),
      alt: `Imagen ${i + 1}`
    })),
    ...videos.map((vid, i) => ({
      type: 'video',
      src: buildSrc(vid, 'videos'),
      alt: `Video ${i + 1}`
    }))
  ];

  const nextMedia = () => setCurrentIndex((prev) => (prev + 1) % media.length);
  const prevMedia = () => setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);

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
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = getAssetSrc('images/default-image.jpg');
                }}
                className={styles['slider-container__image']}
              />
            ) : (
              <div className={styles['slider-container__video-wrapper']}>
                <video
                  controls
                  className={styles['slider-container__video-element']}
                >
                  <source src={media[currentIndex].src} type="video/mp4" />
                  Tu navegador no soporta la etiqueta de video.
                </video>
              </div>
            )}
          </div>
        )}
      </div>

      {media.length > 1 && (
        <div className={styles['slider-container__navigation-buttons']}>
          <button
            className={styles['slider-container__nav-button']}
            onClick={prevMedia}
            aria-label="Anterior"
          >
            <img src={getAssetSrc('icons/arrow-left.png')} alt="Anterior" />
          </button>

          <button
            className={styles['slider-container__nav-button']}
            onClick={nextMedia}
            aria-label="Siguiente"
          >
            <img src={getAssetSrc('icons/arrow-right.png')} alt="Siguiente" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaSlider;
