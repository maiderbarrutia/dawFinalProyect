import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button/Button";
import styles from "./LoginButton.module.scss";
import { getAssetSrc, getUploadedImageSrc } from "@/utils/srcUtils";
import { useAuth } from "@/context/AuthContext";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import { getRequestById } from "@/services/api";
import { Company } from "@/interfaces/Company";

// Definir la interfaz para el token decodificado con el id de la empresa
interface DecodedToken {
  id: string; 
}

const LoginButton: React.FC = () => {
  const { isAuthenticated, logout, token } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [companyLogo, setCompanyLogo] = useState<string | null>(null);
  const navigate = useNavigate();

  // Al autenticarse, obtenemos los datos de la empresa (en este caso el logo)
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchCompanyData(token);
      setIsMenuOpen(false);
    }
  }, [isAuthenticated, token]);

  const fetchCompanyData = async (token: string) => {
    try {
      const decodedToken: DecodedToken = jwt_decode(token);
      const companyId = decodedToken.id;
  
      const data = await getRequestById<Company>(`/empresas`, companyId);
  
      if (data) {
        const logoFile = data.company_logo;
        const logoUrl = logoFile
          ? getUploadedImageSrc(`images/${logoFile}`)
          : getAssetSrc("images/default-image.jpg");
  
        setCompanyLogo(logoUrl);
      } else {
        console.error("No se encontró la empresa en los datos.");
        setCompanyLogo(getAssetSrc("images/default-image.jpg"));
      }
    } catch (error) {
      console.error("Error al obtener los datos de la empresa", error);
      setCompanyLogo(getAssetSrc("images/default-image.jpg"));
    }
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
    setCompanyLogo(null);
    navigate("/login");
  };

  return (
    <div className={styles["login-button"]}>
      {isAuthenticated ? (
        <div>
          {companyLogo && (
            <button
              className={styles["login-button__toggle"]}
              onClick={handleClick}
              aria-label="Abrir el menú de usuario"
            >
              <img
                src={companyLogo}
                loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = getAssetSrc("images/default-image.jpg");
                }}
                alt="Logo de la empresa"
                className={styles["login-button__logo"]}
              />
              <span className={styles["login-button__arrow"]}>{isMenuOpen ? "▲" : "▼"}</span>
            </button>
          )}

          {isMenuOpen && (
            <ul className={styles["login-button__menu"]}>
              <li className={styles["login-button__item"]}>
                <Link to="/perfil" onClick={() => setIsMenuOpen(false)}>Mi cuenta</Link>
              </li>
              <li className={styles["login-button__item"]}>
                <Link to="/crear-actividad" onClick={() => setIsMenuOpen(false)}>Crear actividades</Link>
              </li>
              <li className={`${styles["login-button__item"]} ${styles["login-button__item--logout"]}`}>
                <button onClick={handleLogout}>Cerrar sesión</button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className={styles["login-button__submit"]}>
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
