import { FormEvent, InputHTMLAttributes } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  isRequired?: boolean;
  type?: string;
  isChecked?: boolean;
  value?: string | number;
  name?: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

const Input = (props: InputProps) => {
  const {
    className,
    onChange,
    label,
    accept,
    isRequired,
    value,
    name,
    type = 'text',
    isChecked,
    ...otherProps
  } = props;

  return (
    <div className={classNames(styles.inputWrapper, {}, [className])}>
      {label && (
        <label
          className={classNames(
            styles.label,
            { [styles.required]: isRequired },
            []
          )}
          htmlFor={name || label}
        >
          {label}
        </label>
      )}
      <input
        id={name || label}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        checked={isChecked}
        className={classNames(styles.input, { [styles.fileInput]: accept }, [])}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
