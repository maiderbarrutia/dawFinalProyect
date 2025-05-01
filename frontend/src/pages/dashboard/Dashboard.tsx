import React, { useEffect, useState } from "react";
import { Activity } from "@/interfaces/Activity";
import { Company } from "@/interfaces/Company";
import { getRequest, getRequestById } from "@/services/api";
import ActivityCard from "@/components/common/ActivityCard/ActivityCard";
import { getUploadedImageSrc, getAssetSrc } from "@/utils/srcUtils";
import styles from './Dashboard.module.scss';

const Dashboard: React.FC = () => {
  const [actividades, setActividades] = useState<Activity[]>([]);
  const [empresa, setEmpresa] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    if (!companyId) {
      setError("ID de empresa no encontrado. Inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    const fetchEmpresa = async () => {
      try {
        const empresaData = await getRequestById<Company>("/empresas", companyId);
        setEmpresa(empresaData);
      } catch (err) {
        console.error("Error al obtener datos de empresa:", err);
        setError("Error al obtener los datos de la empresa.");
      }
    };

    const fetchActividades = async () => {
      try {
        const actividadesData = await getRequest<Activity[]>("/actividades");
        setActividades(actividadesData);
      } catch (err) {
        console.error("Error al obtener actividades:", err);
        setError("Error al obtener las actividades.");
      }
    };

    const fetchData = async () => {
      await Promise.all([fetchEmpresa(), fetchActividades()]);
      setLoading(false);
    };

    fetchData();
  }, [companyId]);

  if (loading) return <p>Cargando actividades...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className={styles.dashboard}>
      <div className={styles['section__container']}>
        <h1 className={styles['dashboard__title']}>Perfil de la Empresa</h1>

        {empresa && (
          <section className={styles['dashboard__section']}>
            <h2 className={styles['dashboard__section-title']}>Datos de la empresa:</h2>
            <div className={styles['dashboard__image-wrapper']}>
              <img
                src={
                  empresa.company_logo
                    ? getUploadedImageSrc(`images/${empresa.company_logo}`)
                    : getAssetSrc("images/default-image.jpg")
                }
                alt=""
                className={styles['dashboard__image']}
              />
            </div>
            <p className={styles['dashboard__text']}><strong>Nombre:</strong> {empresa.company_name}</p>
            <p className={styles['dashboard__text']}><strong>Tipo:</strong> {empresa.company_type}</p>
            <p className={styles['dashboard__text']}><strong>CIF:</strong> {empresa.company_cif}</p>
            <p className={styles['dashboard__text']}><strong>Persona de contacto:</strong> {empresa.contact_person}</p>
            <p className={styles['dashboard__text']}><strong>Teléfono:</strong> {empresa.company_phone}</p>
            <p className={styles['dashboard__text']}><strong>Dirección:</strong> {empresa.company_address}</p>
            <p className={styles['dashboard__text']}><strong>Email:</strong> {empresa.company_email}</p>
            {empresa.company_website && (
              <p className={styles['dashboard__text']}><strong>Web:</strong> {empresa.company_website}</p>
            )}
          </section>
        )}

        <section className={styles['dashboard__section']}>
          <h2 className={styles['dashboard__section-title']}>Actividades creadas</h2>
        
          {actividades.filter((actividad) => actividad.company_id === Number(companyId)).length > 0 ? (
            <ul className={styles['dashboard__grid']}>
              {actividades
                .filter((actividad) => actividad.company_id === Number(companyId))
                .map((activity) => (
                  <li key={activity.activity_id} className={styles['dashboard__activity-item']}>
                    <ActivityCard {...activity} />
                  </li>
                ))}
            </ul>
          ) : (
            <p className={styles['dashboard__text']}>No hay actividades creadas aún.</p>
          )}

        </section>
      </div>
    </section>
  );
};

export default Dashboard;

