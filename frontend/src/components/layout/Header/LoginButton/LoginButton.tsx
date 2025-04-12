import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import styles from "./LoginButton.module.scss";
import { getAssetSrc } from "@/utils/srcUtils";
import { useAuth } from "@/context/AuthContext";  // Importamos el hook useAuth
import jwt_decode from "jwt-decode";

// Definir la interfaz para el token decodificado
interface DecodedToken {
  id: string; // Asegúrate de que este sea el campo correcto según el formato de tu token
}

const LoginButton: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();  // Usamos el contexto de autenticación
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Para mostrar/ocultar el submenú
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCompanyData(token); // Solo obtenemos los datos si estamos autenticados
    }
  }, [isAuthenticated, token]);

  const fetchCompanyData = (token: string) => {
    // Decodificar el token para obtener el company_id
    const decodedToken: DecodedToken = jwt_decode(token); // Usamos el tipo DecodedToken
    const companyId = decodedToken.id; // Suponemos que el id de la empresa está en decodedToken.id
  
    // Hacer la solicitud para obtener el logo usando el company_id
    fetch(`http://localhost:3003/api/empresas/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const logoFile = data.company_logo; // Nombre del archivo del logo
          const logoUrl = logoFile
            ? `http://localhost:3003/images/${logoFile}` // Si hay logo, usar la URL generada
            : getAssetSrc(`images/default-image.jpg`); // Ruta al logo por defecto
  
          setCompanyLogo(logoUrl); // Asignar la URL del logo (o la URL del logo por defecto)
        } else {
          console.error("No se encontró la empresa en los datos.");
          setCompanyLogo("/path/to/default/logo.png"); // Si no se encuentra la empresa, también usar logo por defecto
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la empresa", error);
        setCompanyLogo("/path/to/default/logo.png"); // En caso de error, usar logo por defecto
      });
  };

  const handleClick = () => {
    if (isAuthenticated) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout();
    setCompanyLogo(null); // Limpiar el logo al cerrar sesión
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/perfil");
  };

  const goToActivities = () => {
    navigate("/mis-actividades");
  };

  const goToCreateActivities = () => {
    navigate("/crear-actividad");
  };

  return (
    <div className={styles.loginButton}>
      {isAuthenticated ? (
        <div>
          {companyLogo && (
            <div
              className={styles.logoAndArrow}
              onClick={handleClick}
              aria-label="Abrir el menú de usuario"
            >
              <img
                src={companyLogo}
                alt="Logo de la empresa"
                className={styles.logo}
              />
              <span className={styles.arrow}>{isMenuOpen ? "▲" : "▼"}</span>
            </div>
          )}

          {isMenuOpen && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li onClick={goToCreateActivities}>Crear actividades</li>
                <li onClick={goToProfile}>Ver perfil</li>
                <li onClick={goToActivities}>Mis actividades</li>
                <li onClick={handleLogout}>Cerrar sesión</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <Button
          text="Registro / Iniciar sesión"
          handleClick={handleClick}
          ariaLabel="Ir a la página de registro o inicio de sesión"
        />
      )}
    </div>
  );
};

export default LoginButton;
