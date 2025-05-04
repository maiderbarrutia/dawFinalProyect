import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/common/Button/Button';
import { UserData } from '@/interfaces/UserData';
import { Registration } from '@/interfaces/Registration';
import { postRequest } from '@/services/api';
import PopupMessage from '@/components/common/PopupMessage/PopupMessage';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading/Loading';

// Validación con Yup
const validationSchema = Yup.object({
  first_name: Yup.string().required('El nombre es obligatorio.'),
  last_name: Yup.string().required('El apellido es obligatorio.'),
  user_email: Yup.string().email('Correo electrónico inválido').required('El correo es obligatorio.'),
  user_phone: Yup.string().required('El teléfono es obligatorio.'),
  user_city: Yup.string().required('La ciudad es obligatoria.'),
  privacy_policy: Yup.bool().oneOf([true], 'Debes aceptar la política de privacidad.'),
});

// Estado inicial del formulario
const initialFormState: Omit<UserData, 'user_id' | 'user_password' | 'registration_date'> = {
  first_name: '',
  last_name: '',
  user_email: '',
  user_phone: '',
  user_city: '',
  privacy_policy: false,
};

const formFields = [
  { label: 'Nombre', name: 'first_name', type: 'text' },
  { label: 'Apellido', name: 'last_name', type: 'text' },
  { label: 'Correo electrónico', name: 'user_email', type: 'email' },
  { label: 'Teléfono', name: 'user_phone', type: 'tel' },
  { label: 'Ciudad', name: 'user_city', type: 'text' },
  { label: 'He leído y acepto la política de privacidad', name: 'privacy_policy', type: 'checkbox' },
];

const RegistrationForm: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const navigate = useNavigate();

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    values: typeof initialFormState,
    { resetForm }: FormikHelpers<typeof initialFormState>
  ) => {
    setMessage(null);
    setLoading(true);

    try {

      // Crear usuario
      const userResponse = await postRequest<UserData>('/usuarios', {
        ...values,
        registration_date: new Date(),
      });

      // Crear inscripción
      const registrationData: Omit<Registration, 'registration_id'> = {
        user_id: userResponse.user_id,
        activity_id: Number(activityId),
        registration_date: new Date(),
      };

      await postRequest<Registration>('/inscripciones', registrationData);

      setMessage({ type: 'success', text: 'Inscripción realizada con éxito.' });
      resetForm();

      setTimeout(() => navigate(`/actividad/${activityId}`), 1500);

    } catch (error) {
      if (error instanceof Error) {
        setMessage({
          type: 'error',
          text: error.message || 'Error al registrarse en la actividad.',
        });
      } else {
        setMessage({ type: 'error', text: 'Error al registrarse en la actividad.' });
      }
  
      console.error('Error al registrarse en la actividad:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles['registration-form']}>
          <h2 className={styles['registration-form__title']}>Formulario de inscripción</h2>

          {formFields.map((field, index) => (
            <div
              key={index}
              className={`${styles['registration-form__group']} ${field.type === 'checkbox' ? styles['registration-form__group--checkbox'] : ''}`}
            >
              {field.type === 'checkbox' ? (
                <label className={styles['registration-form__checkbox-label']}>
                  <Field
                    className={styles['registration-form__checkbox']}
                    type="checkbox"
                    name={field.name}
                  />
                  <span>
                    He leído y acepto la{' '}
                    <a
                      href="/politica-de-privacidad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles['registration-form__link']}
                    >
                      Política de privacidad
                    </a>
                  </span>
                </label>
              ) : (
                <>
                  <label className={styles['registration-form__label']} htmlFor={field.name}>
                    {field.label}
                  </label>
                  <Field
                    className={styles['registration-form__input']}
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                  />
                </>
              )}
              <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
            </div>
          ))}

          {message && (
            <PopupMessage
              type={message.type}
              message={message.text}
              onClose={() => setMessage(null)}
            />
          )}

          <div className={styles['registration-form__button']}>
            <Button
              text={isSubmitting ? 'Enviando...' : 'Inscribirme'}
              ariaLabel="Enviar inscripción"
              className={styles['registration-form__submit']}
              type="submit"
              disabled={isSubmitting || loading}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
