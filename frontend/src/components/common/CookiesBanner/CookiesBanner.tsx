import React, { useState, useEffect } from 'react';
import styles from './CookiesBanner.module.scss';

const CookieBanner: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className={styles['cookie-banner']}>
      <p className={styles['cookie-banner__text']}>
        Utilizamos cookies para mejorar tu experiencia. Al continuar, aceptas nuestro uso de cookies.{' '}
        <a href="/politica-de-cookies" className={styles['cookie-banner__link']}>
          Leer política de cookies
        </a>
      </p>
      <div className={styles['cookie-banner__buttons']}>
        <button onClick={handleAccept} className={`${styles["cookie-banner__button"]} ${styles["cookie-banner__button--accept"]}`}>
          Aceptar
        </button>
        <button onClick={handleReject} className={`${styles["cookie-banner__button"]} ${styles["cookie-banner__button--reject"]}`}>
          Rechazar
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
