import React, { useEffect, useState } from 'react';
import styles from './FeaturedActivities.module.scss';
import ActivityCard from '@/components/common/ActivityCard/ActivityCard';
import { getRequest } from '@/services/api';
import Button from "@components/common/Button/Button";


interface Activity {
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
  

const FeaturedActivities: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data: Activity[] = await getRequest('/actividades');
        console.log('Actividades obtenidas:', data);
        setActivities(data);
      } catch (error) {
        console.error('Error al cargar actividades:', error);
        setError('No se pudieron cargar las actividades.');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.featuredActivities}>
        <div className={styles['section__container']}>
            <div className={styles.featuredActivities__header}>
                <h2 className={styles.featuredActivities__title}>Lo más destacado</h2>
                <Button
                    text="Más actividades"
                    ariaLabel="Ir a la página de actividades"
                    link='/actividades'
                    className={styles.featuredActivities__button}
                />
            </div>

            <div className={styles.featuredActivities__grid}>
                {activities.length > 0 ? (
                activities.slice(0, 4).map((activity, index) => (
                    
                    <ActivityCard key={`${activity.id_actividad}-${index}`} {...activity} />
                ))
                ) : (
                <p>No hay actividades disponibles.</p>
                )}
            </div>
            
        </div>
    </section>
  );
};

export default FeaturedActivities;
