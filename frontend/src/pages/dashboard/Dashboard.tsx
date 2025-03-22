import React, { useEffect, useState } from "react";

// Tipos para las actividades
interface Actividad {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;
}

const Dashboard: React.FC = () => {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Aquí se obtiene el token de localStorage (puedes ajustarlo según cómo lo guardes)
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setError("Token no encontrado. Por favor, inicie sesión.");
      return;
    }

    const obtenerActividades = async () => {
      try {
        const response = await fetch("/api/actividades", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Asegúrate de poner el token en la cabecera
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const message = response.status === 401 ? "No autorizado" : "Error en la solicitud";
          setError(message);
          return;
        }

        const data = await response.json();
        setActividades(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Ocurrió un error desconocido");
        }
      }
    };

    obtenerActividades();
  }, [token]);

  return (
    <div>
      <h1>Dashboard</h1>

      {error && <div style={{ color: "red" }}>{error}</div>}

      <h2>Actividades</h2>
      <ul>
        {actividades.length > 0 ? (
          actividades.map((actividad) => (
            <li key={actividad.id}>
              <h3>{actividad.nombre}</h3>
              <p>{actividad.descripcion}</p>
              <p>{actividad.fecha}</p>
            </li>
          ))
        ) : (
          <p>No hay actividades disponibles.</p>
        )}
      </ul>
    </div>
  );
};

export default Dashboard;