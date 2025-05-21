import React from 'react';
import styles from './CategoriesFilters.module.scss';

interface CategoriesFiltersProps {
  selectedCategory: number | null;
  setSelectedCategory: (value: number | null) => void;
  categories: { category_id: number; category_name: string }[];
}

const CategoriesFilters: React.FC<CategoriesFiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
  return (
    <div className={styles["categories-filters"]}>
      <div className={styles["categories-filters__options"]}>
        {categories.map((category) => (
          <button
            key={category.category_id}
            onClick={() => setSelectedCategory(category.category_id)}
            className={
              selectedCategory === category.category_id
                ? `${styles["categories-filters__button"]} ${styles["categories-filters__button--active"]}`
                : styles["categories-filters__button"]
            }
          >
            {category.category_name}
          </button>
        ))}

        <button
          onClick={() => setSelectedCategory(null)}
          className={
            selectedCategory === null
              ? `${styles["categories-filters__button"]} ${styles["categories-filters__button--active"]}`
              : styles["categories-filters__button"]
          }
        >
          Todos
        </button>
      </div>
    </div>
  );
};

export default CategoriesFilters;