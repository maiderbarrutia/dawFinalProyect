import React, { useEffect } from 'react';
import styles from './PopupMessage.module.scss';

interface PopupMessageProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const PopupMessage: React.FC<PopupMessageProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={styles.overlay}>
      <div className={`${styles.popupMessage} ${styles[type]}`}>
        {message}
      </div>
    </div>
  );
};


export default PopupMessage;

