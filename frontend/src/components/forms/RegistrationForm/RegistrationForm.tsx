// src/components/pages/ActivityRegisterForm.tsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './RegistrationForm.module.scss';
import Button from '@/components/common/Button/Button';
import { UserData } from '@/interfaces/UserData';
import { Registration } from '@/interfaces/Registration';
import { postRequest } from '@/services/api';

const RegistrationForm: React.FC = () => {
  const { activityId } = useParams<{ activityId: string }>();

  const [formData, setFormData] = useState<Omit<UserData, 'user_id' | 'registration_date'>>({
    first_name: '',
    last_name: '',
    user_email: '',
    user_phone: 0,
    user_city: '',
    user_password: '',
    privacy_policy: false,
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    // Verificar que se haya aceptado la política de privacidad
    if (!formData.privacy_policy) {
      setMessage({ type: 'error', text: 'Debe aceptar la política de privacidad.' });
      setSubmitting(false);
      return;
    }

    // Verificar que el ID de actividad es válido
    if (isNaN(Number(activityId)) || !activityId) {
      setMessage({ type: 'error', text: 'ID de actividad no válido o no proporcionado.' });
      setSubmitting(false);
      return;
    }

    // Validación de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.user_email)) {
      setMessage({ type: 'error', text: 'El correo electrónico no es válido.' });
      setSubmitting(false);
      return;
    }

    try {
      // Paso 1: Crear el usuario
      const user = await postRequest<UserData>('/usuarios', {
        ...formData,
        registration_date: new Date(),
      });
      
      

      // Verifica que el usuario tenga un ID válido
      if (!user || !user.user_id) {
        setMessage({ type: 'error', text: 'No se pudo obtener un ID de usuario.' });
        setSubmitting(false);
        return;
      }

      // Paso 2: Crear la inscripción
      const registrationData: Omit<Registration, 'registration_id'> = {
        user_id: user.user_id,
        activity_id: Number(activityId),
        registration_date: new Date(),
      };

      // Hacemos la solicitud para registrar la inscripción
      await postRequest<Registration>('/inscripciones', registrationData);

      // Mensaje de éxito
      setMessage({ type: 'success', text: 'Inscripción realizada con éxito.' });

      // Resetear el formulario
      setFormData({
        first_name: '',
        last_name: '',
        user_email: '',
        user_phone: 0,
        user_city: '',
        user_password: '',
        privacy_policy: false,
      });

    } catch (error: unknown) {
      console.error(error);

      // Manejo de errores
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message || 'Ocurrió un error inesperado.' });
      } else {
        setMessage({ type: 'error', text: 'Ocurrió un error inesperado.' });
      }
    } finally {
      setSubmitting(false);
    }
  };
  

  return (
    <form className={styles['activity-form']} onSubmit={handleSubmit}>
      <h2 className={styles['activity-form__title']}>Formulario de inscripción</h2>

      {[ // Recorremos los campos del formulario
        { label: 'Nombre', name: 'first_name', type: 'text', value: formData.first_name },
        { label: 'Apellido', name: 'last_name', type: 'text', value: formData.last_name },
        { label: 'Correo electrónico', name: 'user_email', type: 'email', value: formData.user_email },
        { label: 'Teléfono', name: 'user_phone', type: 'tel', value: formData.user_phone },
        { label: 'Ciudad', name: 'user_city', type: 'text', value: formData.user_city },
        { label: 'Contraseña', name: 'user_password', type: 'password', value: formData.user_password },
      ].map(({ label, name, type, value }) => (
        <div key={name} className={styles['activity-form__group']}>
          <input
            className={styles['activity-form__input']}
            type={type}
            name={name}
            placeholder={label}
            value={value}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      <div className={`${styles['activity-form__group']} ${styles['activity-form__group--checkbox']}`}>
        <label className={styles['activity-form__checkbox-label']}>
          <input
            className={styles['activity-form__checkbox']}
            type="checkbox"
            name="privacy_policy"
            checked={formData.privacy_policy}
            onChange={handleChange}
          />
          Acepto la política de privacidad
        </label>
      </div>

      {message && (
        <p className={`${styles['activity-form__message']} ${styles[`activity-form__message--${message.type}`]}`}>
          {message.text}
        </p>
      )}

      <div className={styles['activity-form__button']}>
        <Button
          text={submitting ? 'Enviando...' : 'Inscribirme'}
          ariaLabel="Enviar inscripción"
          className={styles['activity-form__submit']}
          type="submit"
          disabled={submitting}
        />
      </div>
    </form>
  );
};

export default RegistrationForm;
