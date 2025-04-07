import React, { useEffect, useState } from 'react';
import styles from './FeaturedCompanies.module.scss';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import { getRequest } from '@/services/api';
import { Company } from '@/interfaces/Company';
import { getAssetSrc } from '@/utils/srcUtils';
import ItemsCarousel from '@/components/common/ItemsCarousel/ItemsCarousel';

const FeaturedCompanies: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data: Company[] = await getRequest('/empresas');
        setCompanies(data);
      } catch (error) {
        console.error('Error al cargar las empresas:', error);
        setError('No se pudieron cargar las empresas.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  if (loading) return <p>Cargando empresas...</p>;
  if (error) return <p>{error}</p>;

  const logos = companies.map((company) => {
    const imageSrc = getAssetSrc(`images/${company.company_logo}`);
    const placeholderImage = getAssetSrc('images/default-image.jpg');
    return imageSrc || placeholderImage;
  });

  return (
    <section className={`${styles["featuredCompanies"]} ${styles["home-section"]}`}>
      <div className={styles['section__container']}>
        <SectionHeader title="Empresas destacadas" />
        
        {/* Aquí pasas el objeto visibleCount */}
        <ItemsCarousel 
          items={logos} 
          visibleCount={{ mobile: 2, tablet: 4, desktop: 5, large: 5 }} 
        />
      </div>
    </section>
  );
};

export default FeaturedCompanies;


