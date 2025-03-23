import React, { useState } from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  text: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  buttonStyle?: 'primaryColor' | 'black' | 'white';
  hoverStyle?: 'primaryColor' | 'black' | 'white';
  ariaLabel?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  handleClick,
  type = 'button',
  className = '',
  disabled = false,
  buttonStyle = 'primaryColor',
  hoverStyle = 'black',
  ariaLabel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Determina la clase de variante basada en las props
  const buttonStyleClass = styles[`button--${buttonStyle}`];
  const hoverStyleClass = styles[`button--${hoverStyle}`];
  const ariaLabelValue = ariaLabel || text;

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`${styles.button} ${isHovered ? hoverStyleClass : buttonStyleClass} ${className}`}
      disabled={disabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label={ariaLabelValue}
    >
      {text}
    </button>
  );
};

export default Button;
