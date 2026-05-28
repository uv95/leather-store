import { FormEvent, InputHTMLAttributes, useId } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import styles from './Input.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
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
    required,
    value,
    name,
    type = 'text',
    isChecked,
    ...otherProps
  } = props;

  const mods = { [styles.required]: required };
  const isCheckbox = type === 'checkbox' || type === 'radio';
  const inputId = useId();

  return (
    <div className={classNames(styles.inputWrapper, {}, [className])}>
      {label && (
        <label className={classNames(styles.label, mods, [])} htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        checked={isCheckbox ? isChecked : undefined}
        className={classNames(styles.input, { [styles.fileInput]: accept }, [])}
        aria-required={required}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
