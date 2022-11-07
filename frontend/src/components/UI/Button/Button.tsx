import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color: string;
  big?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
  animation?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  text,
  color,
  big,
  type,
  animation,
}) => {
  return (
    <button
      type={type}
      className={`button ${color === 'black' ? 'black' : 'grey'} ${
        big && 'big'
      } ${animation && 'animated'}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
