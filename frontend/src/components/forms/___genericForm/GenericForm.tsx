import React from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers, FormikValues } from 'formik';
import { ObjectSchema } from 'yup';
import styles from './GenericForm.module.scss';

interface FormFieldDefinition {
  name: string;
  type: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
}

interface GenericFormProps<T extends FormikValues> {
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  onSubmit: (values: T, formikHelpers: FormikHelpers<T>) => void | Promise<void>;
  formFields: FormFieldDefinition[];
  title?: string;
  buttonText?: string;
  className?: string;
}

const GenericForm = <T extends FormikValues>({
  initialValues,
  validationSchema,
  onSubmit,
  formFields,
  title,
  buttonText = 'Enviar',
  className
}: GenericFormProps<T>) => {
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ setFieldValue, isSubmitting }) => (
        <Form className={`${styles['generic-form']} ${className || ''}`}>
          {title && <h2 className={styles['generic-form__title']}>{title}</h2>}

          {formFields.map((field, index) => {
            switch (field.type) {
              case 'checkbox':
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
              case 'file':
                return (
                  <div key={index} className={styles['generic-form__group']}>
                    <label className={styles['generic-form__label']} htmlFor={field.name}>
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      type="file"
                      name={field.name}
                      onChange={(event) => setFieldValue(field.name, event.currentTarget.files?.[0] ?? null)}
                      className={styles['generic-form__input']}
                    />
                    <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                  </div>
                );
              case 'select':
                return (
                  <div key={index} className={styles['generic-form__group']}>
                    <label className={styles['generic-form__label']} htmlFor={field.name}>
                      {field.label}
                    </label>
                    <Field as="select" name={field.name} className={styles['generic-form__input']}>
                      {field.options?.map((option, i) => (
                        <option key={i} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Field>
                    <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                  </div>
                );
              case 'radio':
                return (
                  <div key={index} className={styles['generic-form__group']}>
                    {field.label && <span>{field.label}</span>}
                    <div className={styles['generic-form__radio-group']}>
                      {field.options?.map((option, i) => (
                        <label key={i} className={styles['generic-form__radio-label']}>
                          <Field
                            type="radio"
                            name={field.name}
                            value={option.value}
                            className={styles['generic-form__radio']}
                          />
                          {option.label}
                        </label>
                      ))}
                    </div>
                    <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
                  </div>
                );
              default:
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
            }
          })}

          <div className={styles['generic-form__button']}>
            <button type="submit" disabled={isSubmitting}>
              {buttonText}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default GenericForm;
