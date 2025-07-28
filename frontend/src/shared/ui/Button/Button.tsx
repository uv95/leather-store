import { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss';

export enum ButtonSize {
  L = 'l',
  M = 'm',
  S = 's',
}

export enum ButtonColor {
  BLACK = 'black',
  GREY = 'grey',
  CLEAR = 'clear',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  square?: boolean;
  isAnimated?: boolean;
  classNames?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    color = ButtonColor.GREY,
    size = ButtonSize.M,
    isAnimated,
    square,
    disabled,
    classNames,
    onClick,
    ...otherProps
  } = props;

  return (
    <button
      onClick={onClick}
      className={`button button-${color} 
      ${classNames ? classNames : ''} 
      button-${size} 
      ${isAnimated ? 'button--animated' : ''} 
      ${square ? 'button--square' : ''} 
      ${disabled ? `button-${color}--disabled` : ''}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
