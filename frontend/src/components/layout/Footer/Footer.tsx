import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import AisiPlanIcon from '@/assets/icons/logo-aisiplan.svg';
import { getAssetSrc } from '@/utils/srcUtils';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.section__container}>
        <div className={styles.footer__container}>
          <div className={styles.footer__logoSection}>
            <img src={AisiPlanIcon} alt="AisiPlan Logo" className={styles.footer__logoImage} />
          </div>
          <div className={styles.footer__sections}>
            <div className={styles.footer__section}>
              <h2 className={styles.footer__sectionTitle}>Información legal</h2>
              <ul className={styles.footer__list}>
                <li className={styles.footer__listItem}><Link to="/aviso-legal" className={styles.footer__link}>Aviso legal</Link></li>
                <li className={styles.footer__listItem}><Link to="/politica-de-privacidad" className={styles.footer__link}>Política de privacidad</Link></li>
                <li className={styles.footer__listItem}><Link to="/politica-de-cookies" className={styles.footer__link}>Política de cookies</Link></li>
              </ul>
            </div>
            <div className={styles.footer__section}>
              <h2 className={styles.footer__sectionTitle}>Síguenos</h2>
              <div className={styles.footer__socialIcons}>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                  <i className="fab fa-youtube"></i>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            <div className={styles.footer__section}>
              <h2 className={styles.footer__sectionTitle}>Mapa del sitio</h2>
              <ul className={styles.footer__list}>
                <li className={styles.footer__listItem}><Link to="/" className={styles.footer__link}>Inicio</Link></li>
                <li className={styles.footer__listItem}><Link to="/categorias" className={styles.footer__link}>Categorías</Link></li>
                <li className={styles.footer__listItem}><Link to="/actividades" className={styles.footer__link}>Actividades</Link></li>
              </ul>
            </div>
            <div className={styles.footer__section}>
              <h2 className={styles.footer__sectionTitle}>Más información</h2>
              <p className={styles.footer__info}>info@aisiplan.com</p>
              <p className={styles.footer__info}>Calle de las Aventuras, 25, 28005<br />Madrid, España</p>
            </div>
          </div>
        </div>

        <div className={styles.footer__bottom}>
          © {currentYear} | AisiPlan. Todos los derechos reservados
        </div>

        {isVisible && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={styles.footer__scrollTopButton}
        >
          <img src={getAssetSrc('icons/arrow-up.png')} alt="" />
        </button>
        )}

      </div>
    </footer>
  );
};

export default Footer;
