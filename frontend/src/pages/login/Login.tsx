// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { postRequest } from '../../services/api';
// import styles from './Login.module.scss';

// const Login: React.FC = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const data = await postRequest('/empresas/login', { email_empresa: email, contrasena_empresa: password });
//       if (data.token) {
//         localStorage.setItem('token', data.token); // Guardar el token en localStorage
//         navigate('/dashboard'); // Redirigir a la página de dashboard
//       } else {
//         setError('Error en login: ' + data.message);
//       }
//     } catch (error) {
//       setError('Error en login: ' + (error instanceof Error ? error.message : ''));
//     }
//   };

//   return (
//     <div>
//       <h2>Iniciar sesión</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Contraseña"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Iniciar sesión</button>
//       </form>
//       {error && <p>{error}</p>}
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRequest } from '../../services/api'; 
import Button from "@components/common/Button/Button";
import styles from './Login.module.scss';
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();  // Usamos la función login del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Realizamos la petición POST al backend para hacer login
      const data = await postRequest('/empresas/login', { email_empresa: email, contrasena_empresa: password });

      if (data.token) {
        login(data.token); // Usamos la función login del contexto
        navigate('/dashboard'); // Redirigimos al usuario al dashboard
      } else {
        setError('Error en login: ' + data.message); // Si no se recibe token, mostramos el error
      }
    } catch (error) {
      setError('Error en login: ' + (error instanceof Error ? error.message : '')); // Manejo de errores
    }
  };

  return (
      <section id="loginRegister" className={`${styles['loginRegister']}`}>
      <div className={`${styles['container']} ${styles['loginRegister__container']}`}>
      <div className={styles['loginRegister__box']}>
          {/* Formulario de Login */}
          <div className={styles['login']}>
            <h1 className={`${styles['title']} ${styles['login__title']}`}>Inicio de sesión</h1>

            <form onSubmit={handleSubmit} className={styles['login__form']}>
              {/* Campo de Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email_empresa">Email: <span className={styles.required}>*</span></label>
                <input
                  type="email"
                  id="email_empresa"
                  placeholder="Introduce tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              {/* Campo de Contraseña */}
              <div className={styles.formGroup}>
                <label htmlFor="contrasena_empresa">Contraseña: <span className={styles.required}>*</span></label>
                <input
                  type="password"
                  id="contrasena_empresa"
                  placeholder="Introduce tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              {/* Mostrar mensaje de error si existe */}
              {error && <div className={styles.error}>{error}</div>}

              {/* Botón de envío usando el componente Button */}
              <div className={styles.formGroup}>
                <Button
                  text="Iniciar sesión"
                  type="submit"
                  buttonStyle="primaryColor" // Estilo del botón
                  hoverStyle="black" // Estilo cuando el botón se pasa por encima
                  ariaLabel="Iniciar sesión con tus credenciales"
                />
              </div>

              {/* Enlace para recuperar contraseña */}
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
    </section>
  );
};

export default Login;
