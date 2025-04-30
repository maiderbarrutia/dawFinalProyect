import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Activity } from '@/interfaces/Activity';
import { Category } from '@/interfaces/Category';
import { Company } from '@/interfaces/Company';
import styles from './ActivityDetail.module.scss';
import { getRequest } from '@/services/api';
import MediaSlider from '@components/common/MediaSlider/MediaSlider';
import Button from '@components/common/Button/Button';
import locationIcon from '@/assets/icons/location-icon.png';
import timeIcon from '@/assets/icons/time-icon.png';

const ActivityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [activity, setActivity] = useState<Activity | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!id) {
        setError('ID de actividad no proporcionado');
        setLoading(false);
        return;
      }

      try {
        const activityData = await getRequest<Activity>(`/actividades/${id}`);
        setActivity(activityData);
        setError(null);

        // Fetch related company and category
        const [companyData, categoryData] = await Promise.all([
          getRequest<Company>(`/empresas/${activityData.company_id}`),
          getRequest<Category>(`/categorias/${activityData.category_id}`)
        ]);

        setCompany(companyData);
        setCategory(categoryData);
      } catch (err) {
        setError((err as Error).message || 'Error al cargar la actividad');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.getElementById('footer');
      if (footer) {
        const footerPosition = footer.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        setIsFixed(footerPosition > windowHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return <div className={styles.activity__loading}>Cargando...</div>;
  if (error) return <div className={styles.activity__error}>{error}</div>;
  if (!activity) return <div className={styles.activity__notFound}>Actividad no encontrada</div>;

  return (
    <section className={styles.activity}>
      <div className={styles['section__container']}>
        <h1 className={styles.activity__title}>{activity.activity_title}</h1>
        {company?.company_name && (
          <p className={styles.activity__company}>{company?.company_name}</p>
        )}

        <div className={styles.activity__content}>
          <MediaSlider
            images={activity.activity_images || []}
            videos={activity.activity_videos || []}
          />

          <div className={styles.activity__info}>
            <h2 className={styles.activity__infoTitle}>Info</h2>

            {activity.activity_date && activity.activity_time && (
              <div className={styles.activity__date}>
                <img src={timeIcon} alt="Icono fecha y hora" />
                <p>{activity.activity_date} - {activity.activity_time}h</p>
              </div>
            )}

            {activity.activity_location && (
              <div className={styles.activity__location}>
                <img src={locationIcon} alt="Icono localización" />
                <p>
                  {activity.activity_adress ? `${activity.activity_adress} (${activity.activity_location})` : activity.activity_location}
                </p>
              </div>
            )}

            {activity.activity_location && ( // Solo mostramos el mapa si hay localización
              <div className={styles.activity__map}>
                <iframe
                  title="Mapa"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    activity.activity_adress 
                      ? `${activity.activity_adress}, ${activity.activity_location}` 
                      : activity.activity_location
                  )}&output=embed`}
                  className={styles.activity__mapIframe}
                ></iframe>
              </div>
            )}
          </div>
        </div>

        <div className={styles.activity__details}>
          {category?.category_name && (
            <span className={styles.activity__category}>{category.category_name}</span>
          )}

          <ul className={styles.activity__stats}>
            {activity.available_slots > 0 && (
              <li><span>Plazas:</span> {activity.available_slots}</li>
            )}
            {activity.activity_duration > 0 && (
              <li><span>Duración:</span> {activity.activity_duration}h</li>
            )}
            {activity.difficulty_level && (
              <li><span>Dificultad:</span> {activity.difficulty_level}</li>
            )}
          </ul>

          {activity.activity_description && (
            <p className={styles.activity__description}>{activity.activity_description}</p>
          )}

          {activity.includes && (
            <p className={styles["activity__includes"]}><span>Incluye:</span> {activity.includes}</p>
          )}

          {activity.excludes && (
            <p className={styles["activity__excludes"]}><span>No incluye:</span> {activity.excludes}</p>
          )}
        </div>

        <div className={`${styles.activity__footer} ${isFixed ? styles.fixed : ''}`}>
        {activity.activity_price && (
          <p className={styles.activity__price}>
            {Number(activity.activity_price) === 0
              ? 'Gratis' // If the price is 0, display 'Gratis'
              : Number(activity.activity_price) % 1 === 0
              ? Number(activity.activity_price) // If it's a whole number, display it without decimals
              : Number(activity.activity_price).toFixed(2) // If it's a decimal number, show 2 decimal places
            }
            {Number(activity.activity_price) === 0 ? '' : <span>€</span>} {/* Only show € if price is not 'Gratis' */}
          </p>
        )}
          

          <Button
            text="Inscribirme"
            ariaLabel="Ir a la página de Inscripción"
            link={`/inscripcion/${activity.activity_id}`}
            className={styles.activity__button}
          />
        </div>
      </div>
    </section>


  );
};

export default ActivityDetail;
