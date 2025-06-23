import styles from './CookiesPolicy.module.scss';

const PrivacyPolicy: React.FC = () => {

  return (
    <div className={styles.cookiesPolicy}>
      <div className={styles['section__container']}>
      <h1 className={styles['cookiesPolicy__title']}>Política de cookies</h1>

        <div className={styles['cookiesPolicy__group']}>
          <h2>¿Qué son las cookies?</h2>
          <p>Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo 
            (ordenador, teléfono, tablet) cuando visitas un sitio web. 
            Estas cookies permiten al sitio recordar tu acción o preferencias durante un período de tiempo, 
            para que no tengas que volver a ingresarlas cada vez que regresas al sitio o navegas de una página a otra.
          </p>
        </div>

        <div className={styles['cookiesPolicy__group']}>
          <h2>¿Qué tipo de cookies utilizamos?</h2>
          <p>Nuestro sitio web utiliza diferentes tipos de cookies:</p>

          <h3>1. Cookies esenciales</h3>
          <p>Estas cookies son necesarias para que el sitio web funcione correctamente 
            y no se pueden desactivar en nuestros sistemas. 
            Normalmente, se configuran en respuesta a acciones que realizas, 
            como configurar tus preferencias de privacidad, iniciar sesión o completar formularios.
          </p>

          <h3>2. Cookies de rendimiento</h3>
          <p>Estas cookies nos permiten contar las visitas y las fuentes de tráfico, 
            para poder medir y mejorar el rendimiento de nuestro sitio. 
            Ayudan a saber qué páginas son las más y las menos populares y a ver cómo se mueven los visitantes 
            por el sitio. La información que recogen estas cookies es agregada y, por lo tanto, anónima.
          </p>

          <h3>3. Cookies de funcionalidad</h3>
          <p>Estas cookies permiten que el sitio web ofrezca funcionalidades mejoradas y personalización. 
            Pueden ser establecidas por nosotros o por proveedores externos cuyos servicios hemos añadido 
            a nuestras páginas.
          </p>

          <h3>4. Cookies de publicidad</h3>
          <p>Estas cookies pueden ser establecidas a través de nuestro sitio por nuestros socios publicitarios. 
            Pueden ser utilizadas por esas empresas para construir un perfil de tus intereses 
            y mostrarte anuncios relevantes en otros sitios. No almacenan información personal directa, 
            pero se basan en la identificación única de tu navegador y dispositivo de acceso.
          </p>
        </div>

        <div className={styles['cookiesPolicy__group']}>
          <h2>¿Cómo puedes gestionar tus cookies?</h2>
          <p>Puedes gestionar tus preferencias de cookies en cualquier momento. 
            Tienes varias opciones para controlar o limitar el uso de cookies en nuestro sitio web:</p>

          <h3>Configuración del navegador</h3>
          <p>La mayoría de los navegadores te permiten rechazar o aceptar cookies. 
            Puedes configurar tu navegador para que te notifique cuando reciba una cookie, 
            dándote la oportunidad de decidir si la aceptas. La configuración para gestionar cookies 
            suele encontrarse en la sección "Preferencias" o "Opciones" de tu navegador.
          </p>

          <h3>Herramientas de terceros</h3>
          <p>Hay herramientas disponibles que te permiten administrar tus preferencias de cookies. 
            Estas herramientas pueden ser instaladas en tu navegador o descargadas como aplicaciones.
          </p>

          <h3>Opción de rechazo</h3>
          <p>En nuestra política de cookies, tendrás la opción de rechazar ciertas cookies que no sean esenciales 
            para el funcionamiento de nuestro sitio.
          </p>

        </div>

        <div className={styles['cookiesPolicy__group']}>
          <h2>Cambios en nuestra política de cookies</h2>
          <p>Podemos actualizar nuestra política de cookies de vez en cuando para reflejar cambios 
            en nuestras prácticas. Te recomendamos que revises esta página con frecuencia para estar al 
            tanto de cualquier cambio. La fecha de la última actualización se mostrará en la parte superior 
            de esta página.
          </p>
        </div>

        <div className={styles['cookiesPolicy__group']}>
          <h2>Contacto</h2>
          <p>Si tienes preguntas sobre esta política, puedes contactarnos a través del correo electrónico proporcionado en nuestro sitio web.</p>
      
        </div>

        

      </div>
    </div>
  );
};

export default PrivacyPolicy;