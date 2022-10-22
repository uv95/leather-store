import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: () => void;
  text: string;
  color: string;
  big?: boolean;
  type?: 'button' | 'submit' | 'reset' | undefined;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color, big, type }) => {
  return (
    <button
      type={type}
      className={`button ${color === 'black' ? 'black' : 'grey'} ${
        big && 'big'
      }`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
