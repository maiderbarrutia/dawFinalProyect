import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import jwt_decode from 'jwt-decode';
import { postRequest } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Button from '@components/common/Button/Button';
import Loading from '@components/common/Loading/Loading';
import PopupMessage from '@components/common/PopupMessage/PopupMessage';
import styles from './Login.module.scss';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email inválido').required('El email es obligatorio.'),
  password: Yup.string().required('La contraseña es obligatoria.'),
});

interface LoginValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode<{ exp: number }>(token);
        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
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

  const initialValues: LoginValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values: LoginValues) => {
    setMessage(null);
    setLoading(true);

    try {
      const { token, message: serverMessage } = await postRequest<{ token: string; message?: string }>(
        '/empresas/login',
        {
          company_email: values.email,
          company_password: values.password,
        }
      );
      

      if (token) {
        const decoded = jwt_decode<{ id: number; exp: number }>(token);
        const companyId = decoded.id;
        localStorage.setItem('token', token);
        localStorage.setItem('companyId', companyId.toString());
        login(token);

        setMessage({ type: 'success', text: 'Sesión iniciada correctamente'});
        
        setTimeout(() => navigate('/perfil'), 1500);
        
      } else {
        setMessage({ type: 'error', text: serverMessage ?? 'No se pudo iniciar sesión.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Credenciales incorrectas o error del servidor.' });
      console.log()
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <section id="loginRegister" className={styles.loginRegister}>
      <div className={styles['section__container']}>
        <div className={styles['loginRegister__box']}>
          <article className={styles.login}>
            <h1 className={styles['login__title']}>Inicio de sesión</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className={styles['login__form']}>
                  <div className={styles['login__form-group']}>
                    <label htmlFor="email">
                      Email: <span className={styles['form-required']}>*</span>
                    </label>
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Introduce tu email"
                      className={styles['login__input']}
                    />
                    <ErrorMessage name="email" component="div" className={styles['form-error-message']} />
                  </div>

                  <div className={styles['login__form-group']}>
                    <label htmlFor="password">
                      Contraseña: <span className={styles['form-required']}>*</span>
                    </label>
                    <Field
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Introduce tu contraseña"
                      className={styles['login__input']}
                    />
                    <ErrorMessage name="password" component="div" className={styles['form-error-message']} />
                  </div>

                  {message && (
                    <PopupMessage
                      type={message.type}
                      message={message.text}
                      onClose={() => setMessage(null)}
                    />
                  )}

                  <div className={styles['login__form-group']}>
                    <Button
                      text="Iniciar sesión"
                      type="submit"
                      buttonStyle="primaryColor"
                      hoverStyle="black"
                      ariaLabel="Iniciar sesión con tus credenciales"
                      disabled={isSubmitting}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </article>

          <article className={styles.register}>
            <h2 className={styles['register__title']}>Crear cuenta empresa</h2>
            <p className={styles['register__text']}>
              Publica tus actividades y conecta con más clientes. <strong>¡Crea tu cuenta!</strong>
            </p>
            <Button
              text="Crear cuenta de empresa"
              type="button"
              buttonStyle="primaryColor"
              hoverStyle="black"
              ariaLabel="Crear una cuenta de empresa"
              link="/crear-cuenta-empresa"
            />
          </article>
        </div>
      </div>
    </section>
  );
};

export default Login;