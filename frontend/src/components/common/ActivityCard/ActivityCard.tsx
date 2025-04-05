import React from 'react';
import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.scss';
import { getAssetSrc } from '@/utils/srcUtils';

interface ActivityProps {
  activity_id: number;
  activity_title: string;
  activity_description: string;
  activity_price: string;
  activity_date: string;
  activity_time: string;
  activity_duration: number;
  activity_location: string;
  activity_images: string[];
  difficulty_level: string;
  includes: string;
  excludes: string;
  available_slots: number;
  privacy_policy: boolean;
  category: {
    category_id: number;
    category_name: string;
    category_description: string;
    category_image: string;
  };
  company: {
    company_id: number;
    company_name: string;
    company_type: string;
    company_logo: string;
    contact_person: string;
    company_phone: string;
    company_email: string;
    company_website: string;
  };
}

const ActivityCard: React.FC<ActivityProps> = ({
  activity_id,
  activity_title,
  category,
  company,
  activity_price,
  activity_date,
  activity_time,
  activity_duration,
  activity_location,
  activity_images,
}) => {
  const imageSrc = getAssetSrc(`images/${activity_images[0]}`);
  const placeholderImage = getAssetSrc(`images/default-image.jpg`);

  return (
    <article className={styles.activityCard}>
      {/* Caja completa clickeable (sin afectar enlaces internos) */}
      <Link to={`/actividad/${activity_id}`} className={styles.activityCard__link}>
        <div className={styles.activityCard__imageWrapper}>
          <img
            src={imageSrc || placeholderImage}
            alt={activity_title}
            className={styles.activityCard__image}
          />
        </div>
      </Link>

      <div className={styles.activityCard__content}>
        <p className={styles.activityCard__category}>
          {category?.category_name || 'Categoria no disponible'}
        </p>

        {/* Solo el título tiene un enlace individual */}
        <Link to={`/actividad/${activity_id}`} className={styles.activityCard__titleLink}>
          <h3 className={styles.activityCard__title}>{activity_title}</h3>
        </Link>

        <p className={styles.activityCard__provider}>
          {company?.company_name || 'Empresa no disponible'}
        </p>
        <p className={styles.activityCard__price}>{activity_price}€</p>
        <div className={styles.activityCard__details}>
          <span className={styles.activityCard__date}>{activity_date}</span> |{' '}
          <span className={styles.activityCard__time}>{activity_time}</span>
        </div>
        <p className={styles.activityCard__duration}>{activity_duration} minutos</p>
        <p className={styles.activityCard__location}>📍 {activity_location}</p>
      </div>
    </article>
  );
};

export default ActivityCard;
