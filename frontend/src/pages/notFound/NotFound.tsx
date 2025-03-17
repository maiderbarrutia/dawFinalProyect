import styles from './NotFound.module.scss';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className={styles.notFound}>
      <div className={styles.notFound__content}>
        <h1>404</h1>
        <h2>Página no encontrada</h2>
        <p>Lo sentimos, la página que estás buscando no existe o fue movida.</p>
        <Link to="/" className={styles.notFound__link}>
          Volver a la página principal
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
