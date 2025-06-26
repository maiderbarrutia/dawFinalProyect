import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './ActivityCard.module.scss';
import { getAssetSrc, getUploadedImageSrc } from '@/utils/srcUtils';
import { Category } from '@/interfaces/Category';
import { Company } from '@/interfaces/Company';
import { Activity } from '@/interfaces/Activity';
import { getRequest } from '@/services/api';
import Button from '../Button/Button';

interface ActivityCardProps extends Activity {
  onDelete?: (id: number) => void;
}

const ActivityCard: React.FC<ActivityCardProps> = ({
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
  onDelete,
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [company, setCompany] = useState<Company | null>(null);

  const placeholderImage = getAssetSrc("images/default-image.jpg");

let imageSrc = placeholderImage;

if (activity_images && activity_images.length > 0) {
  const firstImage = activity_images[0];

  if (firstImage.startsWith("http://") || firstImage.startsWith("https://")) {
    imageSrc = firstImage; // Imagen alojada en Cloudinary u otro CDN
  } else {
    imageSrc = getUploadedImageSrc(`images/${firstImage}`); // Imagen local
  }
}


  //Obtener los datos de categoría y empresa
  useEffect(() => {
    const fetchCategoryAndCompany = async () => {
      try {
        const categoryData: Category = await getRequest(`/categorias/${category_id}`);
        const companyData: Company = await getRequest(`/empresas/${company_id}`);

        setCategory(categoryData);
        setCompany(companyData);
      } catch (error) {
        console.error('Error al cargar la categoría o la empresa', error);
      }
    };

    fetchCategoryAndCompany();
  }, [category_id, company_id]);
  

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
        {category?.category_name && (
          <p className={styles.activityCard__category}>
            {category.category_name}
          </p>
        )}

        <Link to={`/actividad/${activity_id}`} className={styles.activityCard__titleLink}>
          <h3 className={styles.activityCard__title}>{activity_title}</h3>
        </Link>

        {company?.company_name && (
          <p className={styles.activityCard__provider}>
            {company.company_name}
          </p>
        )}


        {Number(activity_price) >= 0 && (
          <p className={styles.activityCard__price}>
            {Number(activity_price) === 0
              ? 'Gratis'
              : Number(activity_price) % 1 === 0
              ? Number(activity_price)
              : Number(activity_price).toFixed(2)
            }
            {Number(activity_price) === 0 ? '' : <span>€</span>} 
          </p>
        )}

        <div className={styles.activityCard__details}>
          {activity_date && (
            <span className={styles.activityCard__date}>{activity_date}</span> 
          )}
          {activity_date && activity_time && activity_time !== '00:00:00' && ' | '}
          {activity_time && activity_time !== '00:00:00' && (
            <span className={styles.activityCard__time}>{activity_time.slice(0, 5)} h</span>
          )}
        </div>
        {Number(activity_duration) > 0 && (
          <p className={styles.activityCard__duration}>{activity_duration} minutos</p>
        )}
        <p className={styles.activityCard__location}>
          <img
            src={getAssetSrc('icons/location-icon.png')}
            alt="Icono de localización"
            className={styles.activityCard__locationImage}
          />
          {activity_location}
        </p>
      </div>
      {onDelete && (
        
        <Button
            text="Eliminar"
            className={styles.activityCard__deleteButton}
            handleClick={() => onDelete(activity_id)}
            ariaLabel="Eliminar actividad"
          />
      )}
    </article>
  );
};

export default ActivityCard;
