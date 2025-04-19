import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { ObjectSchema } from 'yup';
import styles from './GenericForm.module.scss';

// 1. Interfaz para definir los campos del formulario
interface FormFieldDefinition {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

// 2. Definir las propiedades del formulario genérico
interface GenericFormProps<T extends Record<string, unknown>> {
  initialValues: T;
  validationSchema: ObjectSchema<T>; // Asegúrate de que la validación coincida con los campos de `initialValues`
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  formFields: FormFieldDefinition[];
  title?: string;
}

// 3. Componente genérico
const GenericForm = <T extends Record<string, unknown>>({
  initialValues,
  validationSchema,
  onSubmit,
  formFields,
  title
}: GenericFormProps<T>) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ setFieldValue, isSubmitting }) => (
        <Form className={styles['generic-form']}>
          {title && <h2 className={styles['generic-form__title']}>{title}</h2>}

          {formFields.map((field, index) => {
            if (field.type === 'checkbox') {
              return (
                <div key={index} className={styles['generic-form__group']}>
                  <label className={styles['generic-form__checkbox-label']}>
                    <Field
                      className={styles['generic-form__checkbox']}
                      type="checkbox"
                      name={field.name}
                    />
                    {field.label}
                  </label>
                  <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                </div>
              );
            }

            if (field.type === 'file') {
              return (
                <div key={index} className={styles['generic-form__group']}>
                  <label className={styles['generic-form__label']} htmlFor={field.name}>
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type="file"
                    name={field.name}
                    onChange={(event) =>
                      setFieldValue(field.name, event.currentTarget.files?.[0] ?? null)
                    }
                    className={styles['generic-form__input']}
                  />
                  <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                </div>
              );
            }

            return (
              <div key={index} className={styles['generic-form__group']}>
                {field.label && (
                  <label htmlFor={field.name} className={styles['generic-form__label']}>
                    {field.label}
                  </label>
                )}
                <Field
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className={styles['generic-form__input']}
                  aria-required={field.required ? 'true' : 'false'}
                />
                <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
              </div>
            );
          })}

          <div className={styles['generic-form__button']}>
            <button type="submit" disabled={isSubmitting}>
              Enviar
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default GenericForm;

