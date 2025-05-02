import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Intro.module.scss';
import { getAssetSrc } from '@/utils/srcUtils';
import SearchFilters from '@components/common/searchFilters/SearchFilters';
import { getRequest } from '@/services/api';
import { Activity } from '@/interfaces/Activity';

const Intro: React.FC = () => {
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const activitiesData: Activity[] = await getRequest('/actividades');
        // Extraer ubicaciones únicas, filtrando vacíos y duplicados
        const locations = Array.from(
          new Set(
            activitiesData
              .map((activity: Activity) => activity.activity_location)
              .filter((location: string) => location.trim() !== '')
          )
        );
        setUniqueLocations(locations);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  // Función para aplicar filtros
  const applyFilters = () => {
    navigate(`/actividades?searchText=${searchText}&location=${location}`);
  };

  return (
    <section
      id="intro"
      className={`${styles['intro']} ${styles['home-section']}`}
      style={{ backgroundImage: `url(${getAssetSrc('images/intro-image.jpg')})` }}
    >
      <div className={styles.intro__container}>
        <h1 className={styles.intro__title}>Explora, disfruta y organiza actividades</h1>

        <SearchFilters
          searchText={searchText}
          setSearchText={setSearchText}
          location={location}
          setLocation={setLocation}
          uniqueLocations={uniqueLocations}
          applyFilters={applyFilters}
          isHomePage={true} 
        />
      </div>
    </section>
  );
};

export default Intro;