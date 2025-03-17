import styles from './LoginButton.module.scss'; 
import Button from '@components/common/Button/Button';

const LoginButton: React.FC = () => {
    
  return (
    <div className={styles.loginButton}>

 
    <Button text="Ver más" className={styles['projects__load-more-button']} />
      
    </div>
  );
}

export default LoginButton;