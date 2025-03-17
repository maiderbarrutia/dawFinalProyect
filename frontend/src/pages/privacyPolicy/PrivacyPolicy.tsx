import styles from './PrivacyPolicy.module.scss';

const PrivacyPolicy: React.FC = () => {

  return (
    <div className={styles.privacyPolicy}>
      <div className={`${styles['container']} ${styles['privacyPolicy__container']}`}>

        <div className={styles['privacyPolicy__group']}>
          <p>En este sitio web personal, Maider Barrutia, me comprometo a proteger tu privacidad. 
            Esta política explica cómo manejo la información que recopilamos cuando visitas mi sitio.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Información que Recopilo</h2>
          <p><strong>Datos de contacto</strong>: Solo recopilo información que decides proporcionarme, como tu nombre y correo electrónico a través de formularios de contacto.</p>
          <p><strong>Datos de uso</strong>: Puedo recoger información sobre cómo interactúas con mi sitio, como las páginas que visitas y el tiempo que pasas en ellas.</p>
          <p><strong>Cookies</strong>: Utilizo cookies para mejorar tu experiencia en el sitio.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Uso de la Información</h2>
          <p>Utilizo la información recopilada para:</p>
          <ul>
            <li>Responder a tus preguntas y comentarios.</li>
            <li>Mejorar el contenido de mi sitio.</li>
            <li>Protección de la Información</li>
          </ul>
          <p>Tomaré medidas razonables para proteger tu información personal, 
          pero recuerda que ninguna transmisión de datos por Internet es completamente segura.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Compartir Información</h2>
          <p>No vendo ni comparto tu información personal con terceros, a menos que sea requerido por la ley.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Derechos del Usuario</h2>
          <p>Tienes derecho a acceder y corregir tu información personal. 
            Si deseas hacerlo, por favor contáctame a través del correo electrónico en el sitio.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Cambios a esta Política</h2>
          <p>Puedo actualizar esta política ocasionalmente.</p>
        </div>

        <div className={styles['privacyPolicy__group']}>
          <h2>Contacto</h2>
          <p>Si tienes preguntas sobre esta política, contáctame <a href="mailto:maiderbarrutia@hotmail.com" className={styles['privacy__link']}>aquí</a>.</p>
        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;