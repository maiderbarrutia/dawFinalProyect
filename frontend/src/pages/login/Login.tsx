import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/api'; 
import Button from "@components/common/Button/Button";
import styles from './Login.module.scss';
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        login(token);
        navigate('/dashboard');
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
        <div className={`${styles.container} ${styles.loginRegister__container}`}>
          <div className={styles.loginRegister__box}>
            
            {/* Formulario de Login */}
            <div className={styles.login}>
              <h1 className={`${styles.title} ${styles.login__title}`}>Inicio de sesión</h1>

              <form onSubmit={handleSubmit} className={styles.login__form}>
                <div className={styles.formGroup}>
                  <label htmlFor="email_empresa">
                    Email: <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="email"
                    id="email_empresa"
                    value={email}
                    placeholder="Introduce tu email"
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="contrasena_empresa">
                    Contraseña: <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="password"
                    id="contrasena_empresa"
                    value={password}
                    placeholder="Introduce tu contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    className={styles.input}
                    required
                  />
                </div>

                {error && <div className={styles.error}>{error}</div>}

                <div className={styles.formGroup}>
                  <Button
                    text="Iniciar sesión"
                    type="submit"
                    buttonStyle="primaryColor"
                    hoverStyle="black"
                    ariaLabel="Iniciar sesión con tus credenciales"
                  />
                </div>

                <div className={styles.formGroup}>
                  <a href="/resetear-contrasena" className={styles.link}>
                    ¿Has olvidado tus datos de acceso?
                  </a>
                </div>
              </form>
            </div>

            {/* Sección de Registro */}
            <div className={styles.register}>
              <h2 className={styles.registerTitle}>Crear cuenta empresa</h2>
              <p className={styles.registerText}>
                Publica tus actividades y conecta con más clientes. ¡Crea tu cuenta!
              </p>
              <a href="/crear-cuenta" className={styles.createAccountLink}>
                Crear una cuenta de empresa
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
