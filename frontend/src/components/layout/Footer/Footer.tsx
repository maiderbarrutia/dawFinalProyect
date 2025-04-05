import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import AisiPlanIcon from '@/assets/icons/logo-aisiplan.svg';
import { getAssetSrc } from '@/utils/srcUtils';
import facebookIcon from '@assets/icons/facebook-icon.png'
import linkedinIcon from '@assets/icons/linkedin-icon.png'
import youtubeIcon from '@assets/icons/youtube-icon.png'
import instagramIcon from '@assets/icons/instagram-icon.png'

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
    <footer id='footer' className={styles.footer}>
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
                  <img className={styles["footer__socialImages"]} src={facebookIcon} alt="Icono facebook" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                  <img className={styles["footer__socialImages"]} src={youtubeIcon} alt="Icono youtube" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                  <img className={styles["footer__socialImages"]} src={linkedinIcon} alt="Icono linkedin" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.footer__socialLink}>
                  <img className={styles["footer__socialImages"]} src={instagramIcon} alt="Icono instagram" />
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
