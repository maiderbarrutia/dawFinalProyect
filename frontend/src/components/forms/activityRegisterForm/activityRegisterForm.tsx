import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { postRequest, getRequest } from '@/services/api';
import styles from './activityRegisterForm.module.scss';
import Button from '@/components/common/Button/Button';
import PopupMessage from '@/components/common/PopupMessage/PopupMessage';
import { Category } from '@/interfaces/Category';
import { useNavigate } from 'react-router-dom';
import Loading from '@/components/common/Loading/Loading';

// Validación con Yup
const validationSchema = Yup.object({
    activity_title: Yup.string().required(
        'El título de la actividad es obligatorio.'
    ),
    activity_date: Yup.string().required('La fecha es obligatoria.'),
    activity_location: Yup.string().required('La ubicación es obligatoria.'),
    privacy_policy: Yup.bool().oneOf(
        [true],
        'Debes aceptar la política de privacidad.'
    ),
    category_id: Yup.string().required('La categoría es obligatoria.'),
    activity_images: Yup.array()
        .min(1, 'Debes subir al menos una imagen')
        .of(Yup.mixed().required('La imagen es obligatoria')),
});

const initialFormState = {
    activity_title: '',
    activity_description: '',
    activity_price: 0,
    activity_date: '',
    activity_location: '',
    activity_adress: '',
    activity_time: '',
    activity_duration: 0,
    difficulty_level: 'easy',
    category_id: '',
    available_slots: 0,
    privacy_policy: false,
    registration_date: '',
    activity_images: [] as File[],
};

const formFields = [
    {
        name: 'activity_title',
        type: 'text',
        placeholder: 'Título de la actividad',
        label: 'Título de la actividad',
        required: true,
    },
    {
        name: 'activity_description',
        type: 'textarea',
        placeholder: 'Descripción',
        label: 'Descripción',
        required: false,
    },
    {
        name: 'activity_location',
        type: 'text',
        placeholder: 'Ubicación (Ciudad o pueblo)',
        label: 'Ubicación (Ciudad o pueblo)',
        required: true,
    },
    {
        name: 'activity_adress',
        type: 'text',
        placeholder: 'Dirección',
        label: 'Dirección',
        required: false,
    },
    {
        name: 'activity_date',
        type: 'date',
        placeholder: 'Fecha',
        label: 'Fecha',
        required: true,
    },
    {
        name: 'activity_time',
        type: 'time',
        placeholder: 'Hora',
        label: 'Hora',
        required: false,
    },
    {
        name: 'activity_duration',
        type: 'number',
        placeholder: 'Duración (minutos)',
        label: 'Duración (minutos)',
        required: false,
    },
    {
        name: 'activity_price',
        type: 'number',
        placeholder: 'Precio (€)',
        label: 'Precio (€)',
        required: false,
        step: '0.01',
    },
    {
        name: 'available_slots',
        type: 'number',
        placeholder: 'Plazas disponibles',
        label: 'Plazas disponibles',
        required: false,
    },
];

const ActivityRegisterForm: React.FC = () => {
    const [message, setMessage] = useState<{
        type: 'success' | 'error';
        text: string;
    } | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response: Category[] = await getRequest('/categorias');
                setCategories(response);
            } catch (error) {
                setMessage({
                    type: 'error',
                    text: 'Error al cargar las categorías',
                });
                console.error('Error al cargar las categorías:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (
        values: typeof initialFormState,
        { resetForm }: FormikHelpers<typeof initialFormState>
    ) => {
        setMessage(null);
        setLoading(true);

        const companyId = localStorage.getItem('companyId');
        if (!companyId) {
            setMessage({
                type: 'error',
                text: 'No se encontró ID de empresa. Inicia sesión nuevamente.',
            });
            setLoading(false);
            return;
        }

        const dataToSend = new FormData();
        dataToSend.append('activity_title', values.activity_title);
        dataToSend.append(
            'activity_description',
            values.activity_description || ''
        );
        dataToSend.append('activity_price', String(values.activity_price));
        dataToSend.append('activity_date', values.activity_date);
        dataToSend.append('activity_location', values.activity_location);
        dataToSend.append('activity_adress', values.activity_adress);
        dataToSend.append('activity_time', values.activity_time || '');
        dataToSend.append(
            'activity_duration',
            String(values.activity_duration)
        );
        dataToSend.append('difficulty_level', values.difficulty_level);
        dataToSend.append('category_id', String(values.category_id));
        dataToSend.append('available_slots', String(values.available_slots));
        dataToSend.append('privacy_policy', values.privacy_policy ? '1' : '0');
        dataToSend.append('registration_date', new Date().toISOString());

        // Añadir el company_id
        dataToSend.append('company_id', companyId);

        // Añadir imágenes
        if (values.activity_images && values.activity_images.length > 0) {
            values.activity_images.forEach((file) => {
                dataToSend.append('activity_images', file);
                dataToSend.append('activity_image_names[]', file.name);
            });
        }

        try {
            await postRequest('/actividades', dataToSend);
            setMessage({
                type: 'success',
                text: 'Actividad registrada con éxito.',
            });
            resetForm();

            setTimeout(() => navigate('/perfil'), 1500);
        } catch (error) {
            if (error instanceof Error) {
                setMessage({
                    type: 'error',
                    text: error.message || 'Error al registrar la actividad.',
                });
            } else {
                setMessage({
                    type: 'error',
                    text: 'Error al registrar la actividad.',
                });
            }

            console.error('Error al registrar la actividad:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Loading />;

    return (
        <section className={styles['activity-form']}>
            <div className={styles['section__container']}>
                <Formik
                    initialValues={initialFormState}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ setFieldValue, isSubmitting }) => (
                        <Form>
                            <h2 className={styles['activity-form__title']}>
                                Crear nueva actividad
                            </h2>

                            {/* Mapea los campos dinámicamente */}
                            {formFields.map((field, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles['activity-form__group']}
                                    >
                                        {field.type === 'textarea' ? (
                                            <>
                                                <label
                                                    className={styles['activity-form__label']}
                                                    htmlFor={field.name}
                                                >
                                                    {field.label}
                                                    {field.required && (
                                                        <span className={styles['form-required']}> *</span>
                                                    )}
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
                                                <label
                                                    className={styles['activity-form__label']}
                                                    htmlFor={field.name}
                                                >
                                                    {field.label}
                                                    {field.required && (
                                                        <span className={styles['form-required']}> *</span>
                                                    )}
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
                                        <ErrorMessage
                                            name={field.name}
                                            component="div"
                                            className={styles['form-error-message']}
                                        />
                                    </div>
                                );
                            })}

                            {/* Campo de Selección de Categorías */}
                            <div className={styles['activity-form__group']}>
                                <label
                                    className={styles['activity-form__label']}
                                    htmlFor="category_id"
                                >
                                    Categoría
                                    <span className={styles['form-required']}> *</span>
                                </label>
                                <Field
                                    as="select"
                                    name="category_id"
                                    className={styles['activity-form__input']}
                                >
                                    <option value="" label="Selecciona una categoría" />
                                    {loading ? (
                                        <option value="" disabled>
                                            Cargando...
                                        </option>
                                    ) : (
                                        categories.map((category) => (
                                            <option
                                                key={category.category_id}
                                                value={category.category_id}
                                            >
                                                {category.category_name}
                                            </option>
                                        ))
                                    )}
                                </Field>
                                <ErrorMessage
                                    name="category_id"
                                    component="div"
                                    className={styles['form-error-message']}
                                />
                            </div>

                            {/* Campo de imágenes */}
                            <div className={styles['activity-form__group']}>
                                <label
                                    className={styles['activity-form__label']}
                                    htmlFor="activity_images"
                                >
                                    Imágenes
                                    <span className={styles['form-required']}> *</span>
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
                                <ErrorMessage
                                    name="activity_images"
                                    component="div"
                                    className={styles['form-error-message']}
                                />
                            </div>

                            {/* Política de privacidad */}
                            <div className={styles['activity-form__group']}>
                                <label
                                    className={styles['activity-form__checkbox-label']}
                                >
                                    <Field
                                        type="checkbox"
                                        name="privacy_policy"
                                        className={styles['activity-form__checkbox']}
                                    />
                                    Acepto la política de privacidad
                                </label>
                                <ErrorMessage
                                    name="privacy_policy"
                                    component="div"
                                    className={styles['form-error-message']}
                                />
                            </div>

                            {/* Mensajes de éxito o error */}
                            {message && (
                                <PopupMessage
                                    type={message.type}
                                    message={message.text}
                                    onClose={() => setMessage(null)}
                                />
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
            </div>
        </section>
    );
};

export default ActivityRegisterForm;
