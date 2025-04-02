import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import styles from './ActivitiesPage.module.scss';
import ActivityCard from '@/components/common/ActivityCard/ActivityCard';
import { getRequest } from '@/services/api';
import SearchFilters from '@components/common/searchFilters/SearchFilters';
import CategoriesFilters from '@components/common/categoriesFilters/CategoriesFilters';
import { Activity } from '@/interfaces/Activity';

const ActivitiesPage: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [filteredActivities, setFilteredActivities] = useState<Activity[]>([]);
  const [categories, setCategories] = useState<Activity['category'][]>([]);
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);

  const [searchText, setSearchText] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [appliedSearchText, setAppliedSearchText] = useState<string>('');
  const [appliedLocation, setAppliedLocation] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Leer parámetros de la URL
  const query = new URLSearchParams(useLocation().search);
  const searchTextFromUrl = query.get('searchText') || '';
  const locationFromUrl = query.get('location') || '';
  const categoryFromUrl = query.get('category'); // Leer el parámetro 'category'

  // Cargar actividades y categorías
  useEffect(() => {
    const fetchActivitiesAndCategories = async () => {
      try {
        const activitiesData: Activity[] = await getRequest('/actividades');
        const categoriesData: Activity['category'][] = await getRequest('/categorias');
        
        setActivities(activitiesData);
        setCategories(categoriesData);

        // Extraer ubicaciones únicas
        const locations = Array.from(
          new Set(
            activitiesData
              .map((activity) => activity.activity_location)
              .filter((location: string) => location.trim() !== '') // Filtrar vacíos
          )
        );
        setUniqueLocations(locations);
      } catch (error) {
        setError('Error al cargar actividades o categorias');
        console.error('Error al recuperar actividades:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivitiesAndCategories();
  }, []);

  // Aplicar los filtros cuando cambiamos los parámetros de la URL
  useEffect(() => {
    if (searchTextFromUrl) {
      setAppliedSearchText(searchTextFromUrl);
      setSearchText(searchTextFromUrl); // Actualiza el estado de searchText
    }
    if (locationFromUrl) {
      setAppliedLocation(locationFromUrl);
      setLocation(locationFromUrl);
    }
    if (categoryFromUrl) {
      setSelectedCategory(Number(categoryFromUrl)); // Establece el filtro de categoría desde la URL
    }
  }, [searchTextFromUrl, locationFromUrl, categoryFromUrl]);

  // Filtrar las actividades según los parámetros aplicados
  useEffect(() => {
    let filtered = activities;

    if (appliedSearchText) {
      filtered = filtered.filter(
        (activity) =>
          activity.activity_title.toLowerCase().includes(appliedSearchText.toLowerCase()) ||
          activity.activity_description.toLowerCase().includes(appliedSearchText.toLowerCase())
      );
    }

    if (appliedLocation) {
      filtered = filtered.filter((activity) =>
        activity.activity_location.toLowerCase().includes(appliedLocation.toLowerCase())
      );
    }

    if (selectedCategory !== null) {
      filtered = filtered.filter((activity) => activity.category.category_id === selectedCategory);
    }

    setFilteredActivities(filtered);
  }, [appliedSearchText, appliedLocation, selectedCategory, activities]);

  // Aplicar filtros manualmente (cuando el usuario hace cambios)
  const applyFilters = () => {
    setAppliedSearchText(searchText);
    setAppliedLocation(location);
  };

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>; // Mostrar el error si ocurre

  return (
    <section className={styles.activitiesPage}>
      <div className={styles['section__container']}>

        <div className={styles['activitiesPage__searchFilter-container']}>
          <SearchFilters
            searchText={searchText}
            setSearchText={setSearchText}
            location={location} // El filtro de ubicación debe mostrar este valor
            setLocation={setLocation}
            uniqueLocations={uniqueLocations}
            applyFilters={applyFilters}
            isHomePage={false}
          />
        </div>

        {/* Título con ubicación de la URL */}
        <h1 className={styles.activitiesPage__title}>
          {appliedLocation ? (
            <>
              Actividades en <span>{appliedLocation}</span>
            </>
          ) : (
            'Actividades'
          )}
        </h1>

        <CategoriesFilters
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />

        <div className={filteredActivities.length > 0 ? styles.activitiesPage__grid : ''}>
          {filteredActivities.length > 0 ? (
            filteredActivities.map((activity: Activity) => (
              <ActivityCard key={activity.activity_id} {...activity} />
            ))
          ) : (
            <p className={styles.activitiesPage__notFound}>
              Actividades no encontradas con los filtros seleccionados
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ActivitiesPage;