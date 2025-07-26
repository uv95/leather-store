import { ButtonHTMLAttributes, ReactNode } from 'react';
import './button.scss';

export enum ButtonSize {
  L = 'l',
  M = 'm',
}

export enum ButtonColor {
  BLACK = 'black',
  GREY = 'grey',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: ButtonColor;
  size?: ButtonSize;
  isAnimated?: boolean;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    color = ButtonColor.GREY,
    size = ButtonSize.M,
    isAnimated,
    disabled,
    onClick,
    ...otherProps
  } = props;
  return (
    <button
      onClick={onClick}
      className={`button button-${color} 
      ${size === ButtonSize.L ? 'button--large' : ''} 
      ${isAnimated ? 'button--animated' : ''} 
      ${disabled ? `button-${color}--disabled` : ''}`}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
