import React from "react";
import styles from "./Loading.module.scss";

interface LoadingOverlayProps {
  message?: string;
}

const Loading: React.FC<LoadingOverlayProps> = ({ message = "Cargando..." }) => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
      <p className={styles.loading__message}>{message}</p>
    </div>
  );
};

export default Loading;
