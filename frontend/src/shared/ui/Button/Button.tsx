import { ButtonHTMLAttributes, ReactNode } from 'react';
import { classNames, Mods } from '../../lib/classNames/classNames';
import styles from './Button.module.scss';

export enum ButtonSize {
  L = 'l',
  M = 'm',
  S = 's',
}

export enum ButtonTheme {
  BLACK = 'black',
  GREY = 'grey',
  CLEAR = 'clear',
  OUTLINE = 'outline',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  theme?: ButtonTheme;
  size?: ButtonSize;
  isSquare?: boolean;
  isAnimated?: boolean;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    theme = ButtonTheme.GREY,
    size = ButtonSize.M,
    isAnimated,
    isSquare,
    disabled,
    className,
    onClick,
    ...otherProps
  } = props;

  const mods: Mods = {
    [styles.square]: isSquare,
    [styles.disabled]: disabled,
    [styles.animated]: isAnimated,
  };

  return (
    <button
      onClick={onClick}
      className={classNames(styles.Button, mods, [
        className,
        styles[theme],
        styles[size],
      ])}
      disabled={disabled}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
