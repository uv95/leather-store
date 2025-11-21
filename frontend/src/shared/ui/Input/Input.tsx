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

  const mods = { [styles.required]: isRequired };
  const isCheckbox = type === 'checkbox' || type === 'radio';

  return (
    <div className={classNames(styles.inputWrapper, {}, [className])}>
      {label && (
        <label
          className={classNames(styles.label, mods, [])}
          htmlFor={name || label}
        >
          {label}
        </label>
      )}
      <input
        id={name || label}
        name={name}
        type={type}
        value={isCheckbox ? undefined : value}
        onChange={onChange}
        checked={isCheckbox ? isChecked : undefined}
        className={classNames(styles.input, { [styles.fileInput]: accept }, [])}
        aria-required={isRequired}
        {...otherProps}
      />
    </div>
  );
};

export default Input;
