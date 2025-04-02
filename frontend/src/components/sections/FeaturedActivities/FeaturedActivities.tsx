import React, { useEffect, useState } from 'react';
import styles from './FeaturedActivities.module.scss';
import ActivityCard from '@/components/common/ActivityCard/ActivityCard';
import { getRequest } from '@/services/api';
import Button from "@components/common/Button/Button";
import { Activity } from '@/interfaces/Activity';

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
                activities.slice(0, 8).map((activity, index) => (
                    
                    <ActivityCard key={`${activity.activity_id}-${index}`} {...activity} />
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
