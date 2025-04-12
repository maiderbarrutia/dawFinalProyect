import React, { useState, useEffect } from 'react';
import { getRequest, getRequestById, postRequest } from '@/services/api';
import styles from './activityRegisterForm.module.scss';
import { Category } from '@/interfaces/Category';
import { Company } from '@/interfaces/Company';
import { Activity } from '@/interfaces/Activity';
import { getCompanyIdFromToken } from '@/utils/getCompanyIdFromToken';
import Button from '@/components/common/Button/Button';

const CreateActivityForm: React.FC = () => {
  const [activity, setActivity] = useState<Activity>({
    activity_id: 0,
    activity_title: '',
    activity_description: '',
    activity_price: 0,
    activity_date: '',
    activity_time: '',
    activity_duration: 0,
    activity_location: '',
    activity_type: '',
    activity_images: [],
    activity_videos: [],
    difficulty_level: 'easy',
    includes: '',
    excludes: '',
    available_slots: 0,
    privacy_policy: false,
    category_id: 0,
    company_id: 0,
    registration_date: new Date()
  });

  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories
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
      }
    };
    fetchCategories();
  }, []);

  // Fetch company details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const companyId = getCompanyIdFromToken();
      if (!companyId) {
        setMessage({ type: 'error', text: 'Company is not authenticated.' });
        return;
      }

      try {
        const companyData = await getRequestById<Company>('/empresas', companyId);
        setActivity((prev) => ({
          ...prev,
          company_id: companyData.company_id,
        }));
      } catch (error) {
        setMessage({ type: 'error', text: 'Error fetching company details.' });
        console.error(error);
      }
    };

    fetchCompanyDetails();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    setActivity((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: 'activity_images' | 'activity_videos'
  ) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files).map((file) => file.name);
      setActivity((prev) => ({
        ...prev,
        [fieldName]: fileArray,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!activity.activity_title || !activity.activity_date || !activity.activity_location || !activity.privacy_policy) {
      setMessage({ type: 'error', text: 'Please complete all required fields and accept the privacy policy.' });
      return;
    }

    if (!activity.company_id) {
      setMessage({ type: 'error', text: 'Company ID is missing or invalid.' });
      return;
    }

    if (!['easy', 'medium', 'hard'].includes(activity.difficulty_level)) {
      setMessage({ type: 'error', text: 'Please select a valid difficulty level.' });
      return;
    }

    const dataToSend = {
      ...activity,
      company_id: Number(activity.company_id),
      category_id: Number(activity.category_id),
      registration_date: new Date(),
    };

    try {
      const response = await postRequest('/actividades', dataToSend);
      if (response) {
        setMessage({ type: 'success', text: 'Activity created successfully.' });
        // Reset form after submission
        setActivity({
          activity_id: 0,
          activity_title: '',
          activity_description: '',
          activity_price: 0,
          activity_date: '',
          activity_time: '',
          activity_duration: 0,
          activity_location: '',
          activity_type: '',
          activity_images: [],
          activity_videos: [],
          difficulty_level: 'easy',
          includes: '',
          excludes: '',
          available_slots: 0,
          privacy_policy: false,
          category_id: 0,
          company_id: activity.company_id,
          registration_date: new Date()
        });
      } else {
        setMessage({ type: 'error', text: 'There was an issue creating the activity.' });
      }
    } catch (error) {
      console.error(error);
      setMessage({ type: 'error', text: 'There was an issue creating the activity.' });
    }
  };

  const renderInputField = (
    label: string,
    name: string,
    type: string,
    value: string | number,
    step?: string
  ) => (
    <div key={name} className={styles['activity-form__group']}>
      {type === 'textarea' ? (
        <textarea
          className={styles['activity-form__input']}
          name={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          rows={4}
        />
      ) : (
        <input
          className={styles['activity-form__input']}
          type={type}
          name={name}
          placeholder={label}
          value={value}
          onChange={handleChange}
          step={step}
        />
      )}
    </div>
  );

  return (
    <form className={styles['activity-form']} onSubmit={handleSubmit}>
      <h2 className={styles['activity-form__title']}>Crear nueva actividad</h2>

      {/* Map through fields */}
      {[{ label: 'Titulo', name: 'activity_title', type: 'text', value: activity.activity_title },
        { label: 'Descripción', name: 'activity_description', type: 'textarea', value: activity.activity_description },
        { label: 'Localización', name: 'activity_location', type: 'text', value: activity.activity_location },
        { label: 'Fecha', name: 'activity_date', type: 'date', value: activity.activity_date },
        { label: 'Hora', name: 'activity_time', type: 'time', value: activity.activity_time },
        { label: 'Duración (minutos)', name: 'activity_duration', type: 'number', value: activity.activity_duration },
        { label: 'Precio (€)', name: 'activity_price', type: 'number', value: activity.activity_price, step: '0.01' },
        { label: 'Plazas', name: 'available_slots', type: 'number', value: activity.available_slots }
      ].map(({ label, name, type, value, step }) => renderInputField(label, name, type, value, step))}

      {/* Category Select */}
      <div className={styles['activity-form__group']}>
        <select
          className={styles['activity-form__input']}
          name="category_id"
          value={activity.category_id}
          onChange={handleChange}
        >
          <option value="">Seleccionar categoria</option>
          {categories.map((cat) => (
            <option key={cat.category_id} value={cat.category_id}>
              {cat.category_name}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Level Select */}
      <div className={styles['activity-form__group']}>
        <select
          className={styles['activity-form__input']}
          name="difficulty_level"
          value={activity.difficulty_level}
          onChange={handleChange}
        >
          <option value="easy">Fácil</option>
          <option value="medium">Medio</option>
          <option value="hard">Difícil</option>
        </select>
      </div>

      {/* Activity Images Upload */}
      <div className={styles['activity-form__group']}>
        <label htmlFor="activity_images">Imágenes de la actividad</label>
        <input
          type="file"
          name="activity_images"
          multiple
          onChange={(e) => handleFileChange(e, 'activity_images')}
        />
      </div>

      {/* Activity Videos Upload */}
      <div className={styles['activity-form__group']}>
        <label htmlFor="activity_videos">Videos de la actividad</label>
        <input
          type="file"
          name="activity_videos"
          multiple
          onChange={(e) => handleFileChange(e, 'activity_videos')}
        />
      </div>

      {/* Includes */}
      {renderInputField('Includes', 'includes', 'textarea', activity.includes)}

      {/* Excludes */}
      {renderInputField('Excludes', 'excludes', 'textarea', activity.excludes)}

      {/* Privacy Policy Checkbox */}
      <div className={`${styles['activity-form__group']} ${styles['activity-form__group--checkbox']}`}>
        <label className={styles['activity-form__checkbox-label']}>
          <input
            className={styles['activity-form__checkbox']}
            type="checkbox"
            name="privacy_policy"
            checked={activity.privacy_policy}
            onChange={handleChange}
          />
          Acepto la política de privacidad
        </label>
      </div>

      {/* Error or Success Message */}
      {message && (
        <p className={`${styles['activity-form__message']} ${styles[`activity-form__message--${message.type}`]}`}>
          {message.text}
        </p>
      )}

      <div className={styles['activity-form__button']}>
        <Button
            text="Crear actividad"
            ariaLabel="Crear actividad"
            className={styles['activity-form__submit']}
            type= 'submit'
        />
      </div>
    </form>
  );
};

export default CreateActivityForm;

