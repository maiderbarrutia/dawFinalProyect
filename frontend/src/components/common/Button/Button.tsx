import React, { useState } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  buttonStyle?: 'primaryColor' | 'black' | 'white';
  hoverStyle?: 'primaryColor' | 'black' | 'white';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  type = 'button',
  className = '',
  disabled = false,
  buttonStyle = 'primaryColor',
  hoverStyle = 'black',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determina la clase de variante basada en las props
  const buttonStyleClass = styles[`button--${buttonStyle}`];
  const hoverStyleClass = styles[`button--${hoverStyle}`];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${isHovered ? hoverStyleClass : buttonStyleClass} ${className}`}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </button>
  );
};

export default Button;
