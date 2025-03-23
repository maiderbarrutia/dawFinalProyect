import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import styles from "./LoginButton.module.scss";
import { getAssetSrc } from "@/utils/srcUtils";
import { useAuth } from "@/context/AuthContext";  // Importamos el hook useAuth

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
    fetch("http://localhost:3003/api/empresas", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const logoFile = data[0].logo_empresa;
        const logoUrl = getAssetSrc(`images/${logoFile}`);
        if (logoUrl) {
          setCompanyLogo(logoUrl);
        } else {
          console.error("Imagen no encontrada");
        }
      })
      .catch((error) => {
        console.error("Error al obtener los datos de la empresa", error);
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
    setCompanyLogo(null);
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/perfil");
  };

  const goToActivities = () => {
    navigate("/mis-actividades");
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