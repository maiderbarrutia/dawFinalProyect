import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import styles from "./LoginButton.module.scss";
import { getAssetSrc, getUploadedImageSrc } from "@/utils/srcUtils";
import { useAuth } from "@/context/AuthContext";  // Importamos el hook useAuth
import jwt_decode from "jwt-decode";

// Definir la interfaz para el token decodificado con el id de la empresa
interface DecodedToken {
  id: string; 
}

const LoginButton: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();  // Usamos el contexto de autenticación
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false); // Para mostrar/ocultar el submenú
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const navigate = useNavigate();

  // Al autenticarse, obtenemos los datos de la empresa (en este caso el logo)
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCompanyData(token);
    }
  }, [isAuthenticated, token]);

  // Obtener los datos de la empresa desde el backend usando el ID del token
  const fetchCompanyData = (token: string) => {
    const decodedToken: DecodedToken = jwt_decode(token);
    const companyId = decodedToken.id;
  
    fetch(`http://localhost:3003/api/empresas/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          const logoFile = data.company_logo;
          console.log(data)
          const logoUrl = logoFile
            ? getUploadedImageSrc(`images/${logoFile}`)
            : getAssetSrc(`images/default-image.jpg`);
  
          setCompanyLogo(logoUrl);
        } else {
          console.error("No se encontró la empresa en los datos.");
          setCompanyLogo(getAssetSrc("images/default-image.jpg")); // Si no se encuentra la empresa, también usar logo por defecto
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la empresa", error);
        setCompanyLogo(getAssetSrc("images/default-image.jpg")); // En caso de error, usar logo por defecto
      });
  };

  // Al hacer clic en el botón (logo o texto)
  const handleClick = () => {
    if (isAuthenticated) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      navigate("/login");
    }
  };

  // Cerrar sesión
  const handleLogout = () => {
    logout();
    setCompanyLogo(null); // Limpiar el logo al cerrar sesión
    navigate("/login");
  };

  // Navegaciones del menú desplegable
  const goToProfile = () => {navigate("/perfil");};
  const goToActivities = () => {navigate("/mis-actividades");};
  const goToCreateActivities = () => {navigate("/crear-actividad");};

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
        <div className={styles.loginButton_submit}>
        <Button
          text="Login"
          handleClick={handleClick}
          ariaLabel="Ir a la página de registro o inicio de sesión"
          
        />
        </div>
      )}
    </div>
  );
};

export default LoginButton;
