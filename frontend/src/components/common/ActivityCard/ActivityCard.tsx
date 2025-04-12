import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.scss';
import { getAssetSrc } from '@/utils/srcUtils';
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
  // Estado para almacenar los datos de la categoría y la empresa
  const [category, setCategory] = useState<Category | null>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  const imageSrc = getAssetSrc(`images/${activity_images[0]}`);
  const placeholderImage = getAssetSrc(`images/default-image.jpg`);

  useEffect(() => {
    const fetchCategoryAndCompany = async () => {
      try {
        // Hacer las peticiones para obtener los datos de la categoría y la empresa por ID
        const categoryData: Category = await getRequest(`/categorias/${category_id}`);
        const companyData: Company = await getRequest(`/empresas/${company_id}`);

        // Actualizar los estados con los datos obtenidos
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
        {/* Usamos category.category_name y company.company_name */}
        <p className={styles.activityCard__category}>
          {category?.category_name || 'Categoría no disponible'}
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
