import React from 'react';
import styles from './ActivityCard.module.scss';
import { getAssetSrc } from '@/utils/srcUtils';

interface ActivityProps {
    id_actividad: number;
    titulo_actividad: string;
    descripcion_actividad: string;
    precio_actividad: string;
    fecha_actividad: string;
    hora_actividad: string;
    duracion_actividad: number;
    ubicacion_actividad: string;
    imagenes_actividad: string[];
    nivel_dificultad: string;
    incluye: string;
    no_incluye: string;
    numero_plazas: number;
    politica_privacidad: boolean;
    categoria: {
      id_categoria: number;
      nombre_categoria: string;
      descripcion_categoria: string;
      imagen_categoria: string;
    };
    empresa: {
      id_empresa: number;
      nombre_empresa: string;
      tipo_empresa: string;
      logo_empresa: string;
      persona_contacto: string;
      telefono_empresa: string;
      email_empresa: string;
      web_empresa: string;
    };
  }

  const ActivityCard: React.FC<ActivityProps> = ({
    titulo_actividad,
    categoria,
    empresa,
    precio_actividad,
    fecha_actividad,
    hora_actividad,
    duracion_actividad,
    ubicacion_actividad,
    imagenes_actividad,
  }) => {
    const imageSrc =
      Array.isArray(imagenes_actividad) && imagenes_actividad.length > 0
        ? getAssetSrc(`images/${imagenes_actividad[0]}`)
        : null;
  
    const placeholderImage = getAssetSrc(`images/default-image.jpg`);
  
    return (
      <article className={styles.activityCard}>
        <img
          src={imageSrc || placeholderImage}
          alt={titulo_actividad}
          className={styles.activityCard__image}
        />
        <div className={styles.activityCard__content}>
          <p className={styles.activityCard__category}>
            {categoria?.nombre_categoria || 'Categoría no disponible'}
          </p>
          <h3 className={styles.activityCard__title}>{titulo_actividad}</h3>
          <p className={styles.activityCard__provider}>
            {empresa?.nombre_empresa || 'Proveedor no disponible'}
          </p>
          <p className={styles.activityCard__price}>{precio_actividad}€</p>
          <div className={styles.activityCard__details}>
            <span className={styles.activityCard__date}>{fecha_actividad}</span> |{' '}
            <span className={styles.activityCard__time}>{hora_actividad}</span>
          </div>
          <p className={styles.activityCard__duration}>{duracion_actividad} minutos</p>
          <p className={styles.activityCard__location}>📍 {ubicacion_actividad}</p>
        </div>
      </article>
    );
  };
  

export default ActivityCard;

