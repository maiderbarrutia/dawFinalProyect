import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.scss';
import { getAssetSrc, getUploadedImageSrc } from '@/utils/srcUtils';
import { Category } from '@/interfaces/Category';
import { Company } from '@/interfaces/Company';
import { Activity } from '@/interfaces/Activity';
import { getRequest } from '@/services/api';

const ActivityCard: React.FC<Activity> = ({
  activity_id,
  activity_title,
  category_id,
  company_id, 
  activity_price,
  activity_date,
  activity_time,
  activity_duration,
  activity_location,
  activity_images,
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const placeholderImage = getAssetSrc(`images/default-image.jpg`);
  const imageSrc = getUploadedImageSrc(`images/${activity_images[0]}`);

  useEffect(() => {
    const fetchCategoryAndCompany = async () => {
      try {
        const categoryData: Category = await getRequest(`/categorias/${category_id}`);
        const companyData: Company = await getRequest(`/empresas/${company_id}`);

        setCategory(categoryData);
        setCompany(companyData);
      } catch (error) {
        console.error('Error al cargar la categoría o la empresa', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndCompany();
  }, [category_id, company_id]);

  if (loading) return <p>Cargando...</p>;
  

  return (
    <article className={styles.activityCard}>
      
      <Link to={`/actividad/${activity_id}`} className={styles.activityCard__link}>
        <div className={styles.activityCard__imageWrapper}>
        <img
          src={imageSrc}
          alt={activity_title}
          className={styles.activityCard__image}
          onError={(e) => {
            e.currentTarget.src = placeholderImage;
          }}
        />
        </div>
      </Link>

      <div className={styles.activityCard__content}>
        <p className={styles.activityCard__category}>
          {category?.category_name || 'Categoría no disponible'}
        </p>

        <Link to={`/actividad/${activity_id}`} className={styles.activityCard__titleLink}>
          <h3 className={styles.activityCard__title}>{activity_title}</h3>
        </Link>

        <p className={styles.activityCard__provider}>
          {company?.company_name || 'Empresa no disponible'}
        </p>

        {Number(activity_price) >= 0 && (
          <p className={styles.activityCard__price}>
            {Number(activity_price) === 0
              ? 'Gratis' // If the price is 0, display 'Gratis'
              : Number(activity_price) % 1 === 0
              ? Number(activity_price) // If it's a whole number, display it without decimals
              : Number(activity_price).toFixed(2) // If it's a decimal number, show 2 decimal places
            }
            {Number(activity_price) === 0 ? '' : <span>€</span>} {/* Only show € if price is not 'Gratis' */}
          </p>
        )}

        <div className={styles.activityCard__details}>
          {activity_date && (
            <span className={styles.activityCard__date}>{activity_date}</span> 
          )}
          {activity_date && activity_time && activity_time !== '00:00:00' && ' | '}
          {activity_time && activity_time !== '00:00:00' && (
            <span className={styles.activityCard__time}>{activity_time.slice(0, 5)}</span>
          )}
        </div>
        {Number(activity_duration) > 0 && (
          <p className={styles.activityCard__duration}>{activity_duration} minutos</p>
        )}
        <p className={styles.activityCard__location}>📍 {activity_location}</p>
      </div>
    </article>
  );
};

export default ActivityCard;
