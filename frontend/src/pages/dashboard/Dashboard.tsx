import React, { useEffect, useState } from "react";
import { Activity } from "@/interfaces/Activity";
import { Company } from "@/interfaces/Company";
import { UserData } from "@/interfaces/UserData";
import { Registration } from "@/interfaces/Registration";
import { getRequest, getRequestById } from "@/services/api";
import ActivityCard from "@/components/common/ActivityCard/ActivityCard";
import { getUploadedImageSrc, getAssetSrc } from "@/utils/srcUtils";
import styles from './Dashboard.module.scss';
import { Link } from 'react-router-dom';
import Loading from '@/components/common/Loading/Loading';

const Dashboard: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [company, setCompany] = useState<Company | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const companyId = localStorage.getItem("companyId");

  useEffect(() => {
    if (!companyId) {
      setError("No se encontró el ID de la empresa. Por favor, inicie sesión nuevamente.");
      setLoading(false);
      return;
    }

    const fetchCompany = async () => {
      try {
        const companyData = await getRequestById<Company>("/empresas", companyId);
        setCompany(companyData);
      } catch (err) {
        console.error("Error al obtener los datos de la empresa:", err);
        setError("Error al obtener los datos de la empresa.");
      }
    };

    const fetchActivities = async () => {
      try {
        const activitiesData = await getRequest<Activity[]>("/actividades");
        setActivities(activitiesData);
      } catch (err) {
        console.error("Error al obtener las actividades:", err);
        setError("Error al obtener las actividades.");
      }
    };

    const fetchUsersAndRegistrations = async () => {
      try {
        const userData = await getRequest<UserData[]>("/usuarios");
        const registrationData = await getRequest<Registration[]>("/inscripciones");
        setUsers(userData);
        setRegistrations(registrationData);
      } catch (err) {
        console.error("Error al obtener usuarios o inscripciones", err);
        setError("Error al obtener usuarios o inscripciones.");
      }
    };

    const fetchData = async () => {
      await Promise.all([
        fetchCompany(),
        fetchActivities(),
        fetchUsersAndRegistrations()
      ]);
      setLoading(false);
    };

    fetchData();
  }, [companyId]);

  if (loading) return <Loading message="Cargando..." />;
  if (error) return <p>{error}</p>;

  const companyActivities = activities.filter(
    (activity) => activity.company_id === Number(companyId)
  );

  const companyActivityIds = companyActivities.map((a) => a.activity_id);

  const companyRegistrations = registrations.filter((reg) =>
    companyActivityIds.includes(reg.activity_id)
  );

  const registrationsWithUsers = companyRegistrations.map((reg) => {
    const user = users.find((u) => u.user_id === reg.user_id);
    return {
      ...reg,
      user: user,
    };
  });

  return (
    <section className={styles.dashboard}>
      <div className={styles['section__container']}>
        <h1 className={styles['dashboard__title']}>Perfil de la Empresa</h1>

        {company && (
          <section className={styles['dashboard__section']}>
            <h2 className={styles['dashboard__section-title']}>Datos de la Empresa:</h2>
            <div className={styles['dashboard__image-wrapper']}>
              <img
                src={
                  company.company_logo
                    ? getUploadedImageSrc(`images/${company.company_logo}`)
                    : getAssetSrc("images/default-image.jpg")
                }
                alt=""
                className={styles['dashboard__image']}
              />
            </div>
            <p className={styles['dashboard__text']}><strong>Nombre:</strong> {company.company_name}</p>
            <p className={styles['dashboard__text']}><strong>Tipo:</strong> {company.company_type}</p>
            <p className={styles['dashboard__text']}><strong>CIF:</strong> {company.company_cif}</p>
            <p className={styles['dashboard__text']}><strong>Persona de Contacto:</strong> {company.contact_person}</p>
            <p className={styles['dashboard__text']}><strong>Teléfono:</strong> {company.company_phone}</p>
            <p className={styles['dashboard__text']}><strong>Dirección:</strong> {company.company_address}</p>
            <p className={styles['dashboard__text']}><strong>Correo Electrónico:</strong> {company.company_email}</p>
            {company.company_website && (
              <p className={styles['dashboard__text']}><strong>Sitio Web:</strong> {company.company_website}</p>
            )}
          </section>
        )}

        <section className={styles['dashboard__section']}>
          <h2 className={styles['dashboard__section-title']}>Actividades Creadas</h2>

          {companyActivities.length > 0 ? (
            <ul className={styles['dashboard__grid']}>
              {companyActivities.map((activity) => (
                <li key={activity.activity_id} className={styles['dashboard__activity-item']}>
                  <ActivityCard {...activity} />
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles['dashboard__text']}>Aún no se han creado actividades.</p>
          )}
        </section>

        <section className={styles['dashboard__section']}>
          <h2 className={styles['dashboard__section-title']}>Inscripciones a tus actividades</h2>

          {registrationsWithUsers.length > 0 ? (
            <ul className={styles['dashboard__list']}>
              {registrationsWithUsers.map((registration, index) => {
                const activity = activities.find(a => a.activity_id === registration.activity_id);
                const user = registration.user;

                if (!user || !activity) return null;

                return (
                  <li key={registration.registration_id}>
                    <details className={styles['dashboard__details']}>
                      <summary className={styles['dashboard__summary']}>
                        <strong>{index + 1}. {user.first_name} {user.last_name}</strong> — #{activity.activity_id} —{" "}
                        {new Date(user.registration_date).toLocaleDateString()}
                      </summary>
                      <div style={{ marginTop: "0.5rem", paddingLeft: "1rem" }} className={styles['dashboard__content']}>
                        <p><strong>Actividad:</strong> <Link to={`/actividad/${activity.activity_id}`} className={styles['dashboard__link']}>{activity.activity_title}</Link></p>
                        <p><strong>Correo Electrónico:</strong> {user.user_email}</p>
                        <p><strong>Teléfono:</strong> {user.user_phone}</p>
                        <p><strong>Ciudad:</strong> {user.user_city}</p>
                        <p><strong>Fecha de Inscripción:</strong> {new Date(user.registration_date).toLocaleDateString()} a las {new Date(user.registration_date).toLocaleTimeString()}</p>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className={styles['dashboard__text']}>Aún no hay inscripciones.</p>
          )}
        </section>
      </div>
    </section>
  );
};

export default Dashboard;