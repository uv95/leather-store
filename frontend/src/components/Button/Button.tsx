import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick: () => void;
  text: string;
  color: string;
  big?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, text, color, big }) => {
  return (
    <div
      className={`button ${color === 'black' ? 'black' : 'grey'} ${
        big && 'big'
      }`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Button;
