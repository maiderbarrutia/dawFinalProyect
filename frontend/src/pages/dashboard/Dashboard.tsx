import React, { useEffect, useState } from "react";
import { Activity } from "@/interfaces/Activity";
import { Company } from "@/interfaces/Company";
import { getRequest, getRequestById } from "@/services/api";
import ActivityCard from "@/components/common/ActivityCard/ActivityCard";
import { getUploadedImageSrc, getAssetSrc } from "@/utils/srcUtils";

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
    <div>
      <h1>Perfil de la Empresa</h1>

      {empresa && (
        <section>
          <h2>Datos de la empresa</h2>
          <img src={empresa.company_logo ? getUploadedImageSrc(`images/${empresa.company_logo}`) : getAssetSrc("images/default-image.jpg")} alt="" />
          <p><strong>Nombre:</strong> {empresa.company_name}</p>
          <p><strong>Tipo:</strong> {empresa.company_type}</p>
          <p><strong>CIF:</strong> {empresa.company_cif}</p>
          <p><strong>Persona de contacto:</strong> {empresa.contact_person}</p>
          <p><strong>Teléfono:</strong> {empresa.company_phone}</p>
          <p><strong>Dirección:</strong> {empresa.company_address}</p>
          <p><strong>Email:</strong> {empresa.company_email}</p>
          {empresa.company_website && <p><strong>Web:</strong> {empresa.company_website}</p>}
        </section>
      )}

      <section>
        <h2>Actividades creadas</h2>
        {actividades.length > 0 ? (
          <ul>
            {actividades
        .filter((actividad) => actividad.company_id === Number(companyId))
        .map((activity) => (
          <ActivityCard key={activity.activity_id} {...activity} />
        ))}
          </ul>
        ) : (
          <p>No hay actividades creadas aún.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;

