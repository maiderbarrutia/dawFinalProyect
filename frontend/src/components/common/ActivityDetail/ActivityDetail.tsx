import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Activity } from '@/interfaces/Activity';
import styles from './ActivityDetail.module.scss';
import { getRequest } from '@/services/api';
// import { getAssetSrc } from '@/utils/srcUtils';
import MediaSlider from '@components/common/MediaSlider/MediaSlider';
import Button from '@components/common/Button/Button';
import locationIcon from '@/assets/icons/location-icon.png';
import timeIcon from '@/assets/icons/time-icon.png';

const ActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(true);

  // Fetch activity data when component mounts
  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) {
        setError('ID de actividad no proporcionado');
        setLoading(false);
        return;
      }

      try {
        const data = await getRequest<Activity>(`/actividades/${id}`);
        setActivity(data);
        setError(null);
      } catch (err) {
        setError((err as Error).message || 'Error al cargar la actividad');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  // Scroll event to manage footer behavior
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');

      // Verificar si el footer existe antes de intentar acceder a sus propiedades
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Si el footer está cerca de la parte inferior de la pantalla, quita la posición fija
        if (footerPosition <= windowHeight) {
          setIsFixed(false);
        } else {
          setIsFixed(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (loading) return <div className={styles.activity__loading}>Cargando...</div>;
  if (error) return <div className={styles.activity__error}>{error}</div>;
  if (!activity) return <div className={styles.activity__notFound}>Actividad no encontrada</div>;

  return (
    <section className={styles.activity}>
      <div className={styles['section__container']}>
        <h1 className={styles.activity__title}>{activity.activity_title}</h1>
        <p className={styles.activity__company}>{activity.company?.company_name}</p>

        <div className={styles.activity__content}>
          <MediaSlider
            images={activity.activity_images || []}
            videos={activity.activity_videos || []}
          />

          <div className={styles.activity__info}>
            <h2 className={styles.activity__infoTitle}>Info</h2>
            <div className={styles.activity__date}>
              <img src={timeIcon} alt="Icono fecha y hora" />
              <p>{activity.activity_date} - {activity.activity_time}h</p>
            </div>
            <div className={styles.activity__location}>
              <img src={locationIcon} alt="Icono localización" />
              <p>{activity.activity_location}</p>
            </div>
            <div className={styles.activity__map}>
              {activity.activity_location && (
                <iframe
                  title="Mapa"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(activity.activity_location)}&output=embed`}
                  className={styles.activity__mapIframe}
                ></iframe>
              )}
            </div>
          </div>
        </div>

        <div className={styles.activity__details}>
          <span className={styles.activity__category}>{activity.category?.category_name}</span>
          <ul className={styles.activity__stats}>
            <li><span>Plazas:</span> {activity.available_slots}</li>
            <li><span>Duración:</span> {activity.activity_duration}h</li>
            <li><span>Dificultad:</span> {activity.difficulty_level}</li>
          </ul>

          <p className={styles.activity__description}>{activity.activity_description}</p>
          <p className={styles["activity__includes"]}><span>Incluye:</span> {activity.includes}</p>
          <p className={styles["activity__excludes"]}><span>No incluye:</span> {activity.excludes}</p>
        </div>

        <div className={`${styles.activity__footer} ${isFixed ? styles.fixed : ''}`}
        >
          <p className={styles.activity__price}>{activity.activity_price}<span>€</span></p>
          <Button
            text="Inscribirme"
            ariaLabel="Ir a la página de Inscripción"
            link="/"
            className={styles.activity__button}
          />
        </div>
      </div>
    </section>
  );
};

export default ActivityDetail;
