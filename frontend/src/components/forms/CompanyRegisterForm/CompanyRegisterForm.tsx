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
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const [registeredCompany, setRegisteredCompany] = useState<Company | null>(null); // Para mostrar el logo

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'repeat_password') {
      setRepeatPassword(value);
    } else if (name === 'privacy_policy') {
      setFormData((prevData) => ({
        ...prevData,
        privacy_policy: checked,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCompanyLogo(file);
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setRegisteredCompany(null);
  
    if (!validateRequiredFields()) return;
  
    if (!formData.privacy_policy) {
      setError('Debes aceptar la política de privacidad.');
      return;
    }
  
    if (formData.company_password !== repeatPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }
  
    const currentDate = new Date().toISOString();
  
    const dataToSend = new FormData();
    dataToSend.append('company_name', formData.company_name);
    dataToSend.append('company_type', formData.company_type);
    dataToSend.append('company_cif', formData.company_cif);
    dataToSend.append('contact_person', formData.contact_person);
    dataToSend.append('company_phone', formData.company_phone);
    dataToSend.append('company_address', formData.company_address);
    dataToSend.append('company_email', formData.company_email);
    dataToSend.append('company_password', formData.company_password);
    dataToSend.append('privacy_policy', formData.privacy_policy ? '1' : '0');
    dataToSend.append('registration_date', currentDate);
  
    if (formData.company_website) {
      dataToSend.append('company_website', formData.company_website);
    }
  
    if (companyLogo) {
      dataToSend.append('company_logo', companyLogo);
    }
  
    try {
      const response = await postRequest<{ company: Company }>('/empresas/register', dataToSend, false);
      
      // Guardar la ID de la empresa en el localStorage
      // localStorage.setItem('company_id', response.company.company_id.toString());
      // console.log(response.company.company_id)
  
      setSuccess('Empresa registrada con éxito.');
      setFormData(initialFormState);
      setRepeatPassword('');
      setCompanyLogo(null);
      setRegisteredCompany(response.company); // Guardamos empresa registrada para mostrar el logo
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

      <div className={styles['company-form__group']}>
        <input
          className={styles['company-form__input']}
          type="file"
          name="company_logo"
          accept="image/*"
          onChange={handleLogoChange}
        />
      </div>

      {error && <p className={styles['company-form__message'] + ' ' + styles['company-form__message--error']}>{error}</p>}
      {success && <p className={styles['company-form__message'] + ' ' + styles['company-form__message--success']}>{success}</p>}

      <button className={styles['company-form__submit']} type="submit">
        Crear cuenta
      </button>

      {/* Mostrar logo de empresa si fue registrado */}
      {registeredCompany?.company_logo && (
        <div className={styles['company-form__group']}>
          <p>Logo registrado:</p>
          <img
            src={`http://localhost:3003/images/${registeredCompany.company_logo}`}
            alt="Logo de la empresa"
            style={{ width: '150px', height: 'auto', marginTop: '10px' }}
          />
        </div>
      )}
    </form>
  );
};

export default CompanyRegisterForm;
