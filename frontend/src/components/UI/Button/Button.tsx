import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color: string;
  big?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  animation?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  big,
  type,
  animation,
  disabled,
}) => {
  return (
    <button
      type={type}
      className={`button ${color === 'black' ? 'black' : 'grey'} ${
        big && 'big'
      } ${animation && 'animated'} ${disabled ? `${color}-disabled` : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
