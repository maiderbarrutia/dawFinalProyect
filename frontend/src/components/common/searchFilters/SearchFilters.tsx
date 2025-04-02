import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchFilters.module.scss';

interface SearchFilterProps {
  searchText: string;
  setSearchText: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  uniqueLocations: string[];
  isHomePage?: boolean; // Para saber si estamos en la página principal o en actividades
  applyFilters: () => void; // Función que se llama al hacer clic en el botón
}

const SearchFilters: React.FC<SearchFilterProps> = ({
  searchText,
  setSearchText,
  location,
  setLocation,
  uniqueLocations,
  isHomePage = false, // Si estamos en la home, por defecto será 'false' en ActivitiesPage
  applyFilters,
}) => {
  const navigate = useNavigate();

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(e.target.value);
  };

  const handleButtonClick = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters(); // Solo aplica los filtros cuando se hace clic
    if (isHomePage) {
      // Si estamos en la home, redirigimos a la página de actividades con los filtros
      navigate(`/actividades?searchText=${searchText}&location=${location}`);
    }
  };

  return (
    <div className={styles.filtersContainer}>
      <form className={styles.filtersForm}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Search by title or description"
            value={searchText}
            onChange={handleSearchTextChange}
            className={styles.input}
          />

          <select
            value={location}
            onChange={handleLocationChange}
            className={styles.select}
          >
            <option value="">Select a location</option>
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleButtonClick}
          className={styles.button}
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;

