import styles from './PrivacyPolicy.module.scss';

const PrivacyPolicy: React.FC = () => {

  return (
    <div className={styles.privacyPolicy}>
      <div className={styles['section__container']}>

        <h1 className={styles['privacyPolicy__title']}>Política de privacidad</h1>

        <div className={styles['privacyPolicy__group']}>
          <p>En AisiPlan, nos comprometemos a proteger tu privacidad. Esta política explica cómo manejamos la información que recopilamos cuando visitas nuestro sitio web.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Información que Recopilamos</h2>
          <p><strong>Datos de contacto</strong>: Solo recopilamos información que decides proporcionarnos, como tu nombre y correo electrónico a través de formularios de contacto.</p>
          <p><strong>Datos de uso</strong>: Podemos recopilar información sobre cómo interactúas con nuestro sitio, como las páginas que visitas y el tiempo que pasas en ellas.</p>
          <p><strong>Cookies</strong>: Utilizamos cookies para mejorar tu experiencia en el sitio y ofrecerte contenido relevante.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Uso de la Información</h2>
          <p>Utilizamos la información recopilada para:</p>
          <ul>
            <li>Responder a tus preguntas y comentarios.</li>
            <li>Mejorar el contenido y la funcionalidad de nuestro sitio.</li>
            <li>Brindarte una experiencia de usuario personalizada.</li>
          </ul>
          <p>Tomaremos medidas razonables para proteger tu información personal. Sin embargo, ten en cuenta que ninguna transmisión de datos por Internet es completamente segura.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Compartir Información</h2>
          <p>No vendemos ni compartimos tu información personal con terceros, excepto cuando sea requerido por la ley o cuando sea necesario para cumplir con obligaciones legales.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Derechos del Usuario</h2>
          <p>Tienes derecho a acceder, corregir o eliminar tu información personal. Si deseas hacerlo, por favor contáctanos a través del correo electrónico proporcionado en el sitio.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Cambios a esta Política</h2>
          <p>Esta política puede ser actualizada ocasionalmente para reflejar cambios en nuestras prácticas. Te recomendamos que revises periódicamente esta sección para mantenerte informado.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Contacto</h2>
          <p>Si tienes preguntas sobre esta política o cómo manejamos tu información, no dudes en ponerte en contacto con nosotros a través de nuestro correo electrónico.</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;