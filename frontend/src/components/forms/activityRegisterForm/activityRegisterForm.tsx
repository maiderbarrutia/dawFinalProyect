import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postRequest, getRequest } from '@/services/api';
import styles from './ActivityRegisterForm.module.scss';
import Button from '@/components/common/Button/Button';
import PopupMessage from '@/components/common/Popup/PopupMessage';
import { Category } from '@/interfaces/Category';
import { useNavigate } from 'react-router-dom';

// Validación con Yup
const validationSchema = Yup.object({
  activity_title: Yup.string().required('El título de la actividad es obligatorio.'),
  activity_date: Yup.string().required('La fecha es obligatoria.'),
  activity_location: Yup.string().required('La ubicación es obligatoria.'),
  privacy_policy: Yup.bool().oneOf([true], 'Debes aceptar la política de privacidad.'),
  category_id: Yup.string().required('La categoría es obligatoria.'),
  activity_images: Yup.array().min(1, 'Debes subir al menos una imagen').of(Yup.mixed().required('La imagen es obligatoria'))
});

const initialFormState = {
  activity_title: '',
  activity_description: '',
  activity_price: 0,
  activity_date: '',
  activity_location: '',
  activity_time: '',
  activity_duration: 0,
  difficulty_level: 'easy',
  category_id: '',
  available_slots: 0,
  privacy_policy: false,
  registration_date: '',
  activity_images: [] as File[]
};

const formFields = [
  { name: 'activity_title', type: 'text', placeholder: 'Título de la actividad', label: 'Título de la actividad', required: true },
  { name: 'activity_description', type: 'textarea', placeholder: 'Descripción', label: 'Descripción', required: false },
  { name: 'activity_location', type: 'text', placeholder: 'Ubicación', label: 'Ubicación', required: true },
  { name: 'activity_date', type: 'date', placeholder: 'Fecha', label: 'Fecha', required: true },
  { name: 'activity_time', type: 'time', placeholder: 'Hora', label: 'Hora', required: false },
  { name: 'activity_duration', type: 'number', placeholder: 'Duración (minutos)', label: 'Duración (minutos)', required: false },
  { name: 'activity_price', type: 'number', placeholder: 'Precio (€)', label: 'Precio (€)', required: false, step: '0.01' },
  { name: 'available_slots', type: 'number', placeholder: 'Plazas disponibles', label: 'Plazas disponibles', required: false },
];

const ActivityRegisterForm: React.FC = () => {
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getRequest('/categorias');
        if (Array.isArray(response)) {
          setCategories(response);
        } else {
          throw new Error('Error loading categories.');
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Error loading categories.' });
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (
  values: typeof initialFormState,
  { resetForm }: FormikHelpers<typeof initialFormState>
) => {
  setMessage(null);

  const dataToSend = new FormData();
  dataToSend.append('activity_title', values.activity_title);
  dataToSend.append('activity_description', values.activity_description || '');
  dataToSend.append('activity_price', String(values.activity_price));
  dataToSend.append('activity_date', values.activity_date);
  dataToSend.append('activity_location', values.activity_location);
  dataToSend.append('activity_time', values.activity_time || '');
  dataToSend.append('activity_duration', String(values.activity_duration));
  dataToSend.append('difficulty_level', values.difficulty_level);
  dataToSend.append('category_id', String(values.category_id));
  dataToSend.append('available_slots', String(values.available_slots));
  dataToSend.append('privacy_policy', values.privacy_policy ? '1' : '0');
  dataToSend.append('registration_date', new Date().toISOString());

  if (values.activity_images && values.activity_images.length > 0) {
    values.activity_images.forEach((file) => {
      // Subir el archivo binario
      dataToSend.append('activity_images', file);

      // Si necesitas enviar también los nombres como string:
      dataToSend.append('activity_image_names[]', file.name);
    });
  } else {
    setMessage({ type: 'error', text: 'Debes subir al menos una imagen.' });
    return;
  }

  try {
    await postRequest('/actividades', dataToSend);
    setMessage({ type: 'success', text: 'Actividad registrada con éxito.' });
    resetForm();

    setTimeout(() => {
      navigate('/actividades');
    }, 1500);
  } catch {
    setMessage({ type: 'error', text: 'Hubo un error al registrar la actividad.' });
  }
};

  return (
    <Formik
  initialValues={initialFormState}
  validationSchema={validationSchema}
  onSubmit={handleSubmit}
>
  {({ setFieldValue, isSubmitting }) => (
    <Form className={styles['activity-form']}>
      <h2 className={styles['activity-form__title']}>Crear nueva actividad</h2>

      {/* Mapea los campos dinámicamente */}
      {formFields.map((field, index) => {
        return (
          <div key={index} className={styles['activity-form__group']}>
            {field.type === 'textarea' ? (
              <>
                <label className={styles['activity-form__label']} htmlFor={field.name}>
                  {field.label}
                </label>
                <Field
                  className={styles['activity-form__input']}
                  as="textarea"
                  name={field.name}
                  placeholder={field.placeholder}
                />
              </>
            ) : (
              <>
                <label className={styles['activity-form__label']} htmlFor={field.name}>
                  {field.label}
                </label>
                <Field
                  className={styles['activity-form__input']}
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  step={field.step}
                />
              </>
            )}
            <ErrorMessage name={field.name} component="div" className={styles['form-error-message']} />
          </div>
        );
      })}

      {/* Campo de Selección de Categorías */}
      <div className={styles['activity-form__group']}>
        <label className={styles['activity-form__label']} htmlFor="category_id">
          Categoría
        </label>
        <Field as="select" name="category_id" className={styles['activity-form__input']}>
          <option value="" label="Selecciona una categoría" />
          {loadingCategories ? (
            <option value="" disabled>Cargando...</option>
          ) : (
            categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.category_name}
              </option>
            ))
          )}
        </Field>
        <ErrorMessage name="category_id" component="div" className={styles['form-error-message']} />
      </div>

      {/* Campo de imágenes */}
      <div className={styles['activity-form__group']}>
        <label className={styles['activity-form__label']} htmlFor="activity_images">
          Imágenes
        </label>
        <input
          className={styles['activity-form__input']}
          type="file"
          name="activity_images"
          accept="image/*"
          multiple
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            if (files) {
              const fileArray = Array.from(files);
              setFieldValue('activity_images', fileArray); // Establecer los archivos binarios en Formik
            }
          }}
        />
        <ErrorMessage name="activity_images" component="div" className={styles['form-error-message']} />
      </div>

      {/* Política de privacidad */}
      <div className={styles['activity-form__group']}>
        <label className={styles['activity-form__checkbox-label']}>
          <Field
            type="checkbox"
            name="privacy_policy"
            className={styles['activity-form__checkbox']}
          />
          Acepto la política de privacidad
        </label>
        <ErrorMessage name="privacy_policy" component="div" className={styles['form-error-message']} />
      </div>

      {/* Mensajes de éxito o error */}
      {message && (
        <PopupMessage type={message.type} message={message.text} onClose={() => setMessage(null)} />
      )}

      <div className={styles['activity-form__button']}>
        <Button
          text="Crear actividad"
          ariaLabel="Crear actividad"
          className={styles['activity-form__submit']}
          type="submit"
          disabled={isSubmitting}
        />
      </div>
    </Form>
  )}
</Formik>
  );
};

export default ActivityRegisterForm;









// import React, { useState, useEffect } from 'react';
// import { getRequest, getRequestById, postRequest } from '@/services/api';
// import styles from './activityRegisterForm.module.scss';
// import { Category } from '@/interfaces/Category';
// import { Company } from '@/interfaces/Company';
// import { Activity } from '@/interfaces/Activity';
// import { getCompanyIdFromToken } from '@/utils/getCompanyIdFromToken';
// import Button from '@/components/common/Button/Button';

// const CreateActivityForm: React.FC = () => {
//   const [activity, setActivity] = useState<Activity>({
//     activity_id: 0,
//     activity_title: '',
//     activity_description: '',
//     activity_price: 0,
//     activity_date: '',
//     activity_time: '',
//     activity_duration: 0,
//     activity_location: '',
//     activity_type: '',
//     activity_images: [],
//     activity_videos: [],
//     difficulty_level: 'easy',
//     includes: '',
//     excludes: '',
//     available_slots: 0,
//     privacy_policy: false,
//     category_id: 0,
//     company_id: 0,
//     registration_date: new Date()
//   });

//   const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await getRequest('/categorias');
//         if (Array.isArray(response)) {
//           setCategories(response);
//         } else {
//           throw new Error('Error loading categories.');
//         }
//       } catch (error) {
//         setMessage({ type: 'error', text: 'Error loading categories.' });
//         console.error(error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // Fetch company details
//   useEffect(() => {
//     const fetchCompanyDetails = async () => {
//       const companyId = getCompanyIdFromToken();
//       if (!companyId) {
//         setMessage({ type: 'error', text: 'Company is not authenticated.' });
//         return;
//       }

//       try {
//         const companyData = await getRequestById<Company>('/empresas', companyId);
//         setActivity((prev) => ({
//           ...prev,
//           company_id: companyData.company_id,
//         }));
//       } catch (error) {
//         setMessage({ type: 'error', text: 'Error fetching company details.' });
//         console.error(error);
//       }
//     };

//     fetchCompanyDetails();
//   }, []);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;

//     setActivity((prev) => ({
//       ...prev,
//       [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
//     }));
//   };

//   const handleFileChange = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     fieldName: 'activity_images' | 'activity_videos'
//   ) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files).map((file) => file.name);
//       setActivity((prev) => ({
//         ...prev,
//         [fieldName]: fileArray,
//       }));
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Basic validation
//     if (!activity.activity_title || !activity.activity_date || !activity.activity_location || !activity.privacy_policy) {
//       setMessage({ type: 'error', text: 'Please complete all required fields and accept the privacy policy.' });
//       return;
//     }

//     if (!activity.company_id) {
//       setMessage({ type: 'error', text: 'Company ID is missing or invalid.' });
//       return;
//     }

//     if (!['easy', 'medium', 'hard'].includes(activity.difficulty_level)) {
//       setMessage({ type: 'error', text: 'Please select a valid difficulty level.' });
//       return;
//     }

//     const dataToSend = {
//       ...activity,
//       company_id: Number(activity.company_id),
//       category_id: Number(activity.category_id),
//       registration_date: new Date(),
//     };

//     try {
//       const response = await postRequest('/actividades', dataToSend);
//       if (response) {
//         setMessage({ type: 'success', text: 'Activity created successfully.' });
//         // Reset form after submission
//         setActivity({
//           activity_id: 0,
//           activity_title: '',
//           activity_description: '',
//           activity_price: 0,
//           activity_date: '',
//           activity_time: '',
//           activity_duration: 0,
//           activity_location: '',
//           activity_type: '',
//           activity_images: [],
//           activity_videos: [],
//           difficulty_level: 'easy',
//           includes: '',
//           excludes: '',
//           available_slots: 0,
//           privacy_policy: false,
//           category_id: 0,
//           company_id: activity.company_id,
//           registration_date: new Date()
//         });
//       } else {
//         setMessage({ type: 'error', text: 'There was an issue creating the activity.' });
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage({ type: 'error', text: 'There was an issue creating the activity.' });
//     }
//   };

//   const renderInputField = (
//     label: string,
//     name: string,
//     type: string,
//     value: string | number,
//     step?: string
//   ) => (
//     <div key={name} className={styles['activity-form__group']}>
//       {type === 'textarea' ? (
//         <textarea
//           className={styles['activity-form__input']}
//           name={name}
//           placeholder={label}
//           value={value}
//           onChange={handleChange}
//           rows={4}
//         />
//       ) : (
//         <input
//           className={styles['activity-form__input']}
//           type={type}
//           name={name}
//           placeholder={label}
//           value={value}
//           onChange={handleChange}
//           step={step}
//         />
//       )}
//     </div>
//   );

//   return (
//     <form className={styles['activity-form']} onSubmit={handleSubmit}>
//       <h2 className={styles['activity-form__title']}>Crear nueva actividad</h2>

//       {/* Map through fields */}
//       {[{ label: 'Titulo', name: 'activity_title', type: 'text', value: activity.activity_title },
//         { label: 'Descripción', name: 'activity_description', type: 'textarea', value: activity.activity_description },
//         { label: 'Localización', name: 'activity_location', type: 'text', value: activity.activity_location },
//         { label: 'Fecha', name: 'activity_date', type: 'date', value: activity.activity_date },
//         { label: 'Hora', name: 'activity_time', type: 'time', value: activity.activity_time },
//         { label: 'Duración (minutos)', name: 'activity_duration', type: 'number', value: activity.activity_duration },
//         { label: 'Precio (€)', name: 'activity_price', type: 'number', value: activity.activity_price, step: '0.01' },
//         { label: 'Plazas', name: 'available_slots', type: 'number', value: activity.available_slots }
//       ].map(({ label, name, type, value, step }) => renderInputField(label, name, type, value, step))}

//       {/* Category Select */}
//       <div className={styles['activity-form__group']}>
//         <select
//           className={styles['activity-form__input']}
//           name="category_id"
//           value={activity.category_id}
//           onChange={handleChange}
//         >
//           <option value="">Seleccionar categoria</option>
//           {categories.map((cat) => (
//             <option key={cat.category_id} value={cat.category_id}>
//               {cat.category_name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {/* Difficulty Level Select */}
//       <div className={styles['activity-form__group']}>
//         <select
//           className={styles['activity-form__input']}
//           name="difficulty_level"
//           value={activity.difficulty_level}
//           onChange={handleChange}
//         >
//           <option value="easy">Fácil</option>
//           <option value="medium">Medio</option>
//           <option value="hard">Difícil</option>
//         </select>
//       </div>

//       {/* Activity Images Upload */}
//       <div className={styles['activity-form__group']}>
//         <label htmlFor="activity_images">Imágenes de la actividad</label>
//         <input
//           type="file"
//           name="activity_images"
//           multiple
//           onChange={(e) => handleFileChange(e, 'activity_images')}
//         />
//       </div>

//       {/* Activity Videos Upload */}
//       <div className={styles['activity-form__group']}>
//         <label htmlFor="activity_videos">Videos de la actividad</label>
//         <input
//           type="file"
//           name="activity_videos"
//           multiple
//           onChange={(e) => handleFileChange(e, 'activity_videos')}
//         />
//       </div>

//       {/* Includes */}
//       {renderInputField('Includes', 'includes', 'textarea', activity.includes)}

//       {/* Excludes */}
//       {renderInputField('Excludes', 'excludes', 'textarea', activity.excludes)}

//       {/* Privacy Policy Checkbox */}
//       <div className={`${styles['activity-form__group']} ${styles['activity-form__group--checkbox']}`}>
//         <label className={styles['activity-form__checkbox-label']}>
//           <input
//             className={styles['activity-form__checkbox']}
//             type="checkbox"
//             name="privacy_policy"
//             checked={activity.privacy_policy}
//             onChange={handleChange}
//           />
//           Acepto la política de privacidad
//         </label>
//       </div>

//       {/* Error or Success Message */}
//       {message && (
//         <p className={`${styles['activity-form__message']} ${styles[`activity-form__message--${message.type}`]}`}>
//           {message.text}
//         </p>
//       )}

//       <div className={styles['activity-form__button']}>
//         <Button
//             text="Crear actividad"
//             ariaLabel="Crear actividad"
//             className={styles['activity-form__submit']}
//             type= 'submit'
//         />
//       </div>
//     </form>
//   );
// };

// export default CreateActivityForm;

