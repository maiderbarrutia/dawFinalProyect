import React, { useState } from 'react';
import styles from './Button.module.scss';
import { Link } from 'react-router-dom';

interface ButtonProps {
  text: string;
  handleClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
  buttonStyle?: 'primaryColor' | 'black' | 'white';
  hoverStyle?: 'primaryColor' | 'black' | 'white';
  ariaLabel?: string;
  link?: string;
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
  link,
}) => {
  const [isHovered, setIsHovered] = useState(false);

 
  const buttonStyleClass = styles[`button--${buttonStyle}`];
  const hoverStyleClass = styles[`button--${hoverStyle}`];
  const ariaLabelValue = ariaLabel || text;

  if (link) {
    return (
      <Link to={link} aria-label={ariaLabelValue} className={`${styles.button} ${isHovered ? hoverStyleClass : buttonStyleClass} ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
          {text}
      </Link>
    );
  }

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
