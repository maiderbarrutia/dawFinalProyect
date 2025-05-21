import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchFilters.module.scss';

interface SearchFilterProps {
  searchText: string;
  setSearchText: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  uniqueLocations: string[];
  isHomePage?: boolean;
  applyFilters: () => void;
}

const SearchFilters: React.FC<SearchFilterProps> = ({
  searchText,
  setSearchText,
  location,
  setLocation,
  uniqueLocations,
  isHomePage = false,
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
    applyFilters();
    if (isHomePage) {
      // Si estamos en la home, redirir a la página de actividades con los filtros
      navigate(`/actividades?searchText=${searchText}&location=${location}`);
    }
  };

  return (
    <div className={styles["search-filters"]}>
      <form className={styles["search-filters__form"]}>
        <div className={styles["search-filters__input-group"]}>

          <input
            type="text"
            placeholder="Buscar eventos"
            value={searchText}
            onChange={handleSearchTextChange}
            className={styles["search-filters__input"]}
          />

          <select
            value={location}
            onChange={handleLocationChange}
            className={styles["search-filters__select"]}
          >
            <option value="">Localización</option>
              {uniqueLocations.map((locationName) => (
                <option key={locationName} value={locationName}>
                  {locationName}
                </option>
              ))}
          </select>
        </div>

        <button
          onClick={handleButtonClick}
          className={styles["search-filters__button"]}
        >
          Aplicar
        </button>
      </form>
    </div>
  );
};

export default SearchFilters;

