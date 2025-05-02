import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/api'; 
import Button from "@components/common/Button/Button";
import styles from './Login.module.scss';
import { useAuth } from "../../context/AuthContext";
import jwt_decode from "jwt-decode";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Verifica si el token ha caducado al cargar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Decodificamos el token para obtener su fecha de expiración
        const decodedToken = jwt_decode<{ exp: number }>(token);
        const currentTime = Math.floor(Date.now() / 1000); // Hora actual en segundos

        // Si el token ha caducado
        if (decodedToken.exp < currentTime) {
          // Elimina el token caducado y cierra la sesión
          localStorage.removeItem('token');
          localStorage.removeItem('companyId');
          login('');
          navigate('/login');
        }
      } catch (err) {
        console.error('Error al decodificar el token', err);
      }
    }
  }, [navigate, login]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    try {
      const { token, message } = await postRequest<{ token: string; message?: string }>(
        '/empresas/login',
        {
          company_email: email,
          company_password: password,
        }
      );
  
      if (token) {
        // Decodificar el token para obtener el id de la empresa
        const decodedToken = jwt_decode<{ id: number, exp: number }>(token);
        const companyId = decodedToken.id;
  
        // Almacenar el token y el id de la empresa en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('companyId', companyId.toString());
  
        login(token);
        navigate('/perfil');
      } else {
        setError(message ?? 'No se pudo iniciar sesión.');
      }
    } catch {
      setError('Credenciales incorrectas o error de servidor.');
    }
  };

  return (
    <section id="loginRegister" className={styles.loginRegister}>
      <div className={styles['section__container']}>
        <div className={`${styles['loginRegister__box']}`}>
          
          {/* Formulario de Login */}
          <article className={styles.login}>
            <h1 className={styles['login__title']}>Inicio de sesión</h1>

            <form onSubmit={handleSubmit} className={styles['login__form']}>
              <div className={styles['login__form-group']}>
                <label htmlFor="email_empresa">
                  Email: <span className={styles['login__required']}>*</span>
                </label>
                <input
                  type="email"
                  id="email_empresa"
                  value={email}
                  placeholder="Introduce tu email"
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles['login__input']}
                  required
                />
              </div>

              <div className={styles['login__form-group']}>
                <label htmlFor="contrasena_empresa">
                  Contraseña: <span className={styles['login__required']}>*</span>
                </label>
                <input
                  type="password"
                  id="contrasena_empresa"
                  value={password}
                  placeholder="Introduce tu contraseña"
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles['login__input']}
                  required
                />
              </div>

              {error && <div className={styles['login__error']}>{error}</div>}

              <div className={styles['login__form-group']}>
                <Button
                  text="Iniciar sesión"
                  type="submit"
                  buttonStyle="primaryColor"
                  hoverStyle="black"
                  ariaLabel="Iniciar sesión con tus credenciales"
                />
              </div>

              {/* <div className={styles['login__form-group']}>
                <a href="/resetear-contrasena" className={styles['login__link']}>
                  ¿Has olvidado tus datos de acceso?
                </a>
              </div> */}
            </form>
          </article>

          {/* Sección de Registro */}
          <article className={styles.register}>
            <h2 className={styles['register__title']}>Crear cuenta empresa</h2>
            <p className={styles['register__text']}>
              Publica tus actividades y conecta con más clientes. 
              <strong>¡Crea tu cuenta!</strong>
            </p>

            <Button
              text="Crear cuenta de empresa"
              type="button"
              buttonStyle="primaryColor"
              hoverStyle="black"
              ariaLabel="Crear una cuenta de empresa"
              link='/crear-cuenta-empresa'
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default Login;
