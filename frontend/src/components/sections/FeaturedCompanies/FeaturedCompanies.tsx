import React, { useEffect, useState } from 'react';
import styles from './FeaturedCompanies.module.scss';
import SectionHeader from '@/components/common/SectionHeader/SectionHeader';
import { getRequest } from '@/services/api';
import { Company } from '@/interfaces/Company';
import { getAssetSrc } from '@/utils/srcUtils';

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

  return (
    <section className={`${styles["featuredCompanies"]} ${styles["home-section"]}`}>
      <div className={styles['section__container']}>
        <SectionHeader 
          title="Empresas destacadas"
        />

        <div className={styles.featuredCompanies__grid}>
          {companies.length > 0 ? (
            companies.slice(0, 6).map((company) => {
              // Definir la variable imageSrc fuera de map
              const imageSrc = company.company_logo && company.company_logo.trim() !== ''
                ? getAssetSrc(`images/${company.company_logo}`)
                : getAssetSrc('images/default-image.jpg');

                console.log(imageSrc)
              
              return (
                <div key={company.company_id} className={styles.featuredCompany}>
                  <img src={imageSrc} alt={company.company_name} className={styles.companyLogo} />
                  <p className={styles.companyName}>{company.company_name}</p>
                </div>
              );
            })
          ) : (
            <p>No hay empresas disponibles.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCompanies;
