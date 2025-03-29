import React from 'react';
import { useNavigate } from "react-router-dom";
import styles from './Intro.module.scss';
import { getAssetSrc } from '@/utils/srcUtils'; 
import { useFormik } from "formik";
import * as Yup from "yup";


const Intro: React.FC = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
          activity: "",
        },
        validationSchema: Yup.object({
          activity: Yup.string()
            .required("Por favor, introduce el nombre de una actividad"),
        }),
        onSubmit: (values) => {
          // Redirige al usuario a la página de resultados con el término de búsqueda en la URL
          navigate(`/search?q=${values.activity}`);
        },
      });
    


    

    return (
        <section id="intro" className={`${styles['intro']} ${styles['home-section']}`}
        style={{ backgroundImage: `url(${getAssetSrc(`images/intro-image.jpg`)})` }}
        >

            <div>
                <h1>Explora, disfruta y organiza actividades</h1>

                <form onSubmit={formik.handleSubmit}>
                    <div>
                        <label htmlFor="activity">Buscar actividad:</label>
                        <input
                        id="activity"
                        name="activity"
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.activity}
                        />
                        {formik.touched.activity && formik.errors.activity ? (
                        <div style={{ color: "red" }}>{formik.errors.activity}</div>
                        ) : null}
                    </div>
                    <button type="submit" style={{ marginTop: "10px" }}>
                        Buscar
                    </button>
                    </form>


            </div>
            
        </section>

        
    );
};

export default Intro;