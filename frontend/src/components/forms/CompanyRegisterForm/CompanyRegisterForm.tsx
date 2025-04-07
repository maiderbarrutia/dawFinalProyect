import React, { useState } from 'react';
import { postRequest } from '@/services/api';
import styles from './CompanyRegisterForm.module.scss';
import { Company } from '@/interfaces/Company';

const initialFormState: Omit<Company, 'company_id' | 'company_logo'> = {
  company_name: '',
  company_type: '',
  company_cif: '',
  contact_person: '',
  company_phone: '',
  company_address: '',
  company_website: '',
  company_email: '',
  company_password: '',
  privacy_policy: false,
  registration_date: '',
};

const CompanyRegisterForm: React.FC = () => {
  const [formData, setFormData] = useState<Omit<Company, 'company_id' | 'company_logo'>>(initialFormState);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>(''); // State for repeat password

  // Handle input field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'repeat_password') {
      setRepeatPassword(value); // Update repeatPassword state separately
    } else if (name === 'privacy_policy') {
      setFormData((prevData) => ({
        ...prevData,
        privacy_policy: checked, // Update privacy policy state correctly
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  // Validate required fields
  const validateRequiredFields = () => {
    const requiredFields: (keyof Omit<Company, 'company_id' | 'company_logo'>)[] = [
      'company_name',
      'company_email',
      'company_password',
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(`El campo ${field} es obligatorio.`);
        return false;
      }
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateRequiredFields()) {
      return; // Stop submission if any required field is empty
    }

    if (!formData.privacy_policy) {
      setError('Debes aceptar la política de privacidad.');
      return;
    }

    if (formData.company_password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Manually setting registration_date to the current date
    const currentDate = new Date().toISOString();

    // Prepare the data to be sent in the request
    const dataToSend = {
      ...formData,
      registration_date: currentDate,
    };

    try {
      await postRequest('/empresas/register', dataToSend); // Send form data
      setSuccess('Empresa registrada con éxito.');
      setFormData(initialFormState); // Clear form
      setRepeatPassword(''); // Clear repeat password field
    } catch (err) {
      console.error(err);
      setError('Hubo un error al registrar la empresa.');
    }
  };

  const inputFields: {
    name: keyof Omit<Company, 'company_id' | 'company_logo'>;
    placeholder: string;
    type: string;
  }[] = [
    { name: 'company_name', placeholder: 'Nombre Empresa', type: 'text' },
    { name: 'company_type', placeholder: 'Tipo de Empresa', type: 'text' },
    { name: 'company_cif', placeholder: 'CIF', type: 'text' },
    { name: 'contact_person', placeholder: 'Persona de Contacto', type: 'text' },
    { name: 'company_phone', placeholder: 'Teléfono', type: 'text' },
    { name: 'company_address', placeholder: 'Dirección de la Empresa', type: 'text' },
    { name: 'company_website', placeholder: 'Web Empresa', type: 'text' },
    { name: 'company_email', placeholder: 'Email Empresa', type: 'email' },
    { name: 'company_password', placeholder: 'Contraseña', type: 'password' },
  ];

  return (
    <form className={styles['company-form']} onSubmit={handleSubmit}>
      <h2 className={styles['company-form__title']}>Crear cuenta de empresa</h2>

      {inputFields.map((field) => (
        <div className={styles['company-form__group']} key={field.name}>
          <input
            className={styles['company-form__input']}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name] as string}
            onChange={handleChange}
            required
          />
        </div>
      ))}

      {/* Repeat password field */}
      <div className={styles['company-form__group']}>
        <input
          className={styles['company-form__input']}
          type="password"
          name="repeat_password"
          placeholder="Repetir Contraseña"
          value={repeatPassword}
          onChange={handleChange}
          required
        />
      </div>

      {/* Privacy policy checkbox */}
      <div className={styles['company-form__group'] + ' ' + styles['company-form__group--checkbox']}>
        <label className={styles['company-form__checkbox-label']}>
          <input
            className={styles['company-form__checkbox']}
            type="checkbox"
            name="privacy_policy"
            checked={formData.privacy_policy}
            onChange={handleChange}
          />
          He leído y acepto la{' '}
          <a
            href="/politica-de-privacidad"
            target="_blank"
            rel="noopener noreferrer"
            className={styles['company-form__link']}
          >
            Política de privacidad
          </a>
        </label>
      </div>

      {error && <p className={styles['company-form__message'] + ' ' + styles['company-form__message--error']}>{error}</p>}
      {success && <p className={styles['company-form__message'] + ' ' + styles['company-form__message--success']}>{success}</p>}

      <button className={styles['company-form__submit']} type="submit">
        Crear cuenta
      </button>
    </form>
  );
};

export default CompanyRegisterForm;
