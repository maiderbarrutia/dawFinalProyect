
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postRequest } from '@/services/api';
import styles from './CompanyRegisterForm.module.scss';
import { Company } from '@/interfaces/Company';
import PopupMessage from '@/components/common/Popup/PopupMessage';
import Button from '@/components/common/Button/Button';

// Componente genérico para los campos del formulario
interface FieldProps {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

const FormField: React.FC<FieldProps> = ({ name, type, placeholder, label, required }) => (
  <div className={styles['company-form__group']}>
    {label && <label className={styles['company-form__label']} htmlFor={name}>{label}</label>}
    <Field
      className={styles['company-form__input']}
      type={type}
      name={name}
      placeholder={placeholder}
      required={required}
    />
    <ErrorMessage name={name} component="div" className={styles['form-error-message']} />
  </div>
);


// Validación de Yup
const validationSchema = Yup.object({
  company_name: Yup.string().required('El nombre de la empresa es obligatorio.'),
  company_type: Yup.string(),
  company_cif: Yup.string().required('El CIF es obligatorio.'),
  contact_person: Yup.string().required('La persona de contacto es obligatoria.'),
  company_phone: Yup.string().required('El teléfono de la empresa es obligatorio.'),
  company_address: Yup.string().required('La dirección de la empresa es obligatoria.'),
  company_email: Yup.string().email('Correo electrónico inválido').required('El email es obligatorio.'),
  company_password: Yup.string().required('La contraseña es obligatoria.'),
  repeat_password: Yup.string()
    .oneOf([Yup.ref('company_password')], 'Las contraseñas no coinciden')
    .required('Debes repetir la contraseña.'),
  privacy_policy: Yup.bool().oneOf([true], 'Debes aceptar la política de privacidad.'),
  company_logo: Yup.mixed().notRequired().nullable(),
});

const initialFormState: Omit<Company, 'company_id' | 'company_logo'> & { repeat_password: string } = {
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
  repeat_password: '',
};

// Definimos los campos del formulario
const formFields = [
  { name: "company_name", type: "text", placeholder: "Nombre Empresa", label: "Nombre de la Empresa", required: true },
  { name: "company_type", type: "text", placeholder: "Tipo de Empresa", label: "Tipo de Empresa", required: false },
  { name: "company_cif", type: "text", placeholder: "CIF", label: "CIF", required: true },
  { name: "contact_person", type: "text", placeholder: "Persona de Contacto", label: "Persona de Contacto", required: true },
  { name: "company_phone", type: "text", placeholder: "Teléfono", label: "Teléfono", required: true },
  { name: "company_address", type: "text", placeholder: "Dirección de la Empresa", label: "Dirección de la Empresa", required: true },
  { name: "company_website", type: "text", placeholder: "Web Empresa", label: "Web Empresa", required: false },
  { name: "company_email", type: "email", placeholder: "Email Empresa", label: "Email Empresa", required: true },
  { name: "company_password", type: "password", placeholder: "Contraseña", label: "Contraseña", required: true },
  { name: "repeat_password", type: "password", placeholder: "Repetir Contraseña", label: "Repetir Contraseña", required: true },
  { name: "company_logo", type: "file", label: "Logo de la Empresa", required: false },
  { name: "privacy_policy", type: "checkbox", label: "He leído y acepto la política de privacidad", required: true }
];

const CompanyRegisterForm: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [companyLogo, setCompanyLogo] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (
    values: Omit<Company, 'company_id' | 'company_logo'> & { repeat_password: string },
    { resetForm }: FormikHelpers<Omit<Company, 'company_id' | 'company_logo'> & { repeat_password: string }>
  ) => {
    setError('');
    setSuccess('');
  
    const currentDate = new Date().toISOString();
  
    const dataToSend = new FormData();
    dataToSend.append('company_name', values.company_name);
    dataToSend.append('company_type', values.company_type);
    dataToSend.append('company_cif', values.company_cif);
    dataToSend.append('contact_person', values.contact_person);
    dataToSend.append('company_phone', values.company_phone);
    dataToSend.append('company_address', values.company_address);
    dataToSend.append('company_email', values.company_email);
    dataToSend.append('company_password', values.company_password);
    dataToSend.append('privacy_policy', values.privacy_policy ? '1' : '0');
    dataToSend.append('registration_date', currentDate);
  
    if (values.company_website) {
      dataToSend.append('company_website', values.company_website);
    }
  
    if (companyLogo) {
      dataToSend.append('company_logo', companyLogo);
    }
  
    try {
      await postRequest<{ company: Company }>('/empresas/register', dataToSend, false);
      // console.clear();
  
      setSuccess('Empresa registrada con éxito.');
      resetForm();
      setCompanyLogo(null);
  
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (err) {
      if (err && typeof err === 'object' && 'message' in err) {
        const errorMessage = (err as { message: string }).message || 'Hubo un error al registrar la empresa.';
        setError(errorMessage);
      } else {
        setError('Hubo un error inesperado.');
      }
    }
  };
  

  return (
    <Formik
      initialValues={initialFormState}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className={styles['company-form']}>
          <h2 className={styles['company-form__title']}>Crear cuenta de empresa</h2>

          {/* Mapea los campos dinámicamente */}
          {formFields.map((field, index) => {
            if (field.type === "checkbox") {
              return (
                <div key={index} className={styles['company-form__group'] + ' ' + styles['company-form__group--checkbox']}>
                  <label className={styles['company-form__checkbox-label']}>
                    <Field
                      className={styles['company-form__checkbox']}
                      type={field.type}
                      name={field.name}
                    />
                    {field.label && (
                      <>
                        He leído y acepto la{' '}
                        <a
                          href="/politica-de-privacidad"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles['company-form__link']}
                        >
                          Política de privacidad
                        </a>
                      </>
                    )}
                  </label>
                  <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                </div>
              );
            } else if (field.type === 'file') {
              return (
                <div key={index} className={styles['company-form__group']}>
                  <input
                    className={styles['company-form__input']}
                    type={field.type}
                    name={field.name}
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files ? e.target.files[0] : null;
                      setCompanyLogo(file);
                    }}
                  />
                </div>
              );
            } else {
              return <FormField key={index} {...field} />;
            }
          })}

          {error && <PopupMessage type="error" message={error} onClose={() => setError('')} />}
          {success && <PopupMessage type="success" message={success} onClose={() => setSuccess('')} />}

          <div className={styles['company-form__button']}>
            <Button
              text="Crear cuenta"
              ariaLabel="Crear cuenta"
              className={styles['company-form__submit']}
              type= 'submit'
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CompanyRegisterForm;

