import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.scss'; 

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
    return (
      <footer className={styles.footer}>
        <p>© {currentYear} | Diseñado y codificado por Maider Barrutia |{' '} 
          <Link className={styles.footer__link} to="/politica-de-privacidad">POLÍTICA DE PRIVACIDAD</Link>
        </p>
      </footer>
    )
}
export default Footer