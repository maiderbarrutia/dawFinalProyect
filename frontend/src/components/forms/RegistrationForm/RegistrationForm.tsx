import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/common/Button/Button';
import { UserData } from '@/interfaces/UserData';
import { Registration } from '@/interfaces/Registration';
import { postRequest } from '@/services/api';
import PopupMessage from '@/components/common/Popup/PopupMessage';
import { useNavigate } from 'react-router-dom';

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
  // Aquí agregamos el campo de política de privacidad
  { label: 'He leído y acepto la política de privacidad', name: 'privacy_policy', type: 'checkbox' },
];

const RegistrationForm: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: Omit<UserData, 'user_id' | 'user_password' | 'registration_date'>,
    { resetForm }: FormikHelpers<Omit<UserData, 'user_id' | 'user_password' | 'registration_date'>>
  ) => {
    setMessage(null);

    // Verificar que el ID de actividad es válido
    if (isNaN(Number(activityId)) || !activityId) {
      setMessage({ type: 'error', text: 'ID de actividad no válido o no proporcionado.' });
      return;
    }

    try {
      // Crear u obtener al usuario
      const userResponse = await postRequest<UserData>('/usuarios', {
        ...values,
        registration_date: new Date(),
      });

      if (!userResponse?.user_id) {
        setMessage({ type: 'error', text: 'No se pudo obtener un ID de usuario.' });
        return;
      }

      // Crear la inscripción para el usuario
      const registrationData: Omit<Registration, 'registration_id'> = {
        user_id: userResponse.user_id,
        activity_id: Number(activityId),
        registration_date: new Date(),
      };

      // Hacer la solicitud para registrar la inscripción
      const registrationResponse = await postRequest<Registration>('/inscripciones', registrationData);

      if (!registrationResponse || !registrationResponse.registration_id) {
        setMessage({ type: 'error', text: 'No se pudo realizar la inscripción.' });
        return;
      }

      // Mensaje de éxito
      setMessage({ type: 'success', text: 'Inscripción realizada con éxito.' });

      // Resetear el formulario
      resetForm();

      // Redirigir después de la inscripción
      setTimeout(() => {
        navigate(`/actividad/${activityId}`);
      }, 1500);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
      setMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className={styles['registration-form']}>
          <h2 className={styles['registration-form__title']}>Formulario de inscripción</h2>

          {/* Mapea los campos dinámicamente */}
          {formFields.map((field, index) => {
            if (field.type === "checkbox") {
              return (
                <div key={index} className={`${styles['registration-form__group']} ${styles['registration-form__group--checkbox']}`}>
                  <label className={styles['registration-form__checkbox-label']}>
                    <Field
                      className={styles['registration-form__checkbox']}
                      type={field.type}
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
                  <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                </div>
              );
            } else if (field.type === 'file') {
              return (
                <div key={index} className={styles['registration-form__group']}>
                  <input
                    className={styles['registration-form__input']}
                    type={field.type}
                    name={field.name}
                    accept="image/*"
                    onChange={(e) => setFieldValue('user_image', e.target.files ? e.target.files[0] : null)}
                  />
                </div>
              );
            } else {
              return (
                <div key={index} className={styles['registration-form__group']}>
                  <label className={styles['registration-form__label']} htmlFor={field.name}>
                    {field.label}
                  </label>
                  <Field
                    className={styles['registration-form__input']}
                    type={field.type}
                    name={field.name}
                    placeholder={field.label}
                  />
                  <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                </div>
              );
            }
          })}

          {message && (
            <PopupMessage type={message.type} message={message.text} onClose={() => setMessage(null)} />
          )}

          <div className={styles['registration-form__button']}>
            <Button
              text={isSubmitting ? 'Enviando...' : 'Inscribirme'}
              ariaLabel="Enviar inscripción"
              className={styles['registration-form__submit']}
              type="submit"
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
