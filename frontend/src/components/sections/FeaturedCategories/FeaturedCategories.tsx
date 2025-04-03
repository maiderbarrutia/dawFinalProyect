import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importa Link
import styles from './FeaturedCategories.module.scss';
import { getRequest } from '@/services/api';
import { getAssetSrc } from '@/utils/srcUtils';
import Button from "@components/common/Button/Button";

interface Category {
  category_id: number;
  category_name: string;
  category_description: string;
  category_image: string;
}

const FeaturedCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // const categoriesToShow = [1, 3, 4, 5];
  const categoriesToShow = ['Aventura', 'Deportes', 'Cultura', 'Entretenimiento'];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data: Category[] = await getRequest('/categorias');
        console.log('Categorías obtenidas:', data);
        // const filteredCategories = data.filter((category) =>
        //   categoriesToShow.includes(category.category_id)
        // );
        const filteredCategories = data.filter((category) =>
          categoriesToShow.includes(category.category_name) // Filtramos por el nombre de la categoría
        );

        setCategories(filteredCategories);
      } catch (error) {
        console.error('Error al cargar categorías:', error);
        setError('No se pudieron cargar las categorías.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  });

  if (loading) return <p>Cargando categorías...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className={`${styles['featuredCategories']} ${styles['home-section']}`}>
      <div className={styles['section__container']}>
        <div className={styles['featuredCategories__grid']}>
          <div className={styles['featuredCategories__categories']}>
            {categories.slice(0, 4).map((category) => {
              const imageSrc = category.category_image && category.category_image.trim() !== ''
                ? getAssetSrc(`images/${category.category_image}`)
                : getAssetSrc(`images/default-image.jpg`);

              const placeholderImage = getAssetSrc(`images/default-image.jpg`);

              return (
                <Link
                  to={`/actividades?category=${category.category_id}`} // Redirige con parámetro 'category'
                  key={category.category_id}
                  className={styles['featuredCategories__card']}
                  style={{ backgroundImage: `url(${imageSrc || placeholderImage})` }}
                >
                  <span className={styles['featuredCategories__card-text']}>
                    {category.category_name}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className={styles['featuredCategories__content']}>
            <h2 className={styles['featuredCategories__title']}>Explora tus próximas aventuras</h2>
            <p className={styles['featuredCategories__description']}>
              Explora nuestras categorías y encuentra la actividad ideal para ti. ¡Empieza a disfrutar hoy mismo!
            </p>
            <Button
                text="Descúbrelo ahora"
                ariaLabel="Ir a la página de actividades"
                link='/actividades'
                className={styles.featuredCategories__button}
            />
          
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;

