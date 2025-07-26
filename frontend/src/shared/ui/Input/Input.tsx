import React, { InputHTMLAttributes } from 'react';
import './input.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = (props) => {
  return (
    <>
      <label
        className={`label ${props.required && 'required'}`}
        htmlFor={props.name}
      >
        {props.label}
      </label>
      <input
        onChange={props.onChange}
        className={`input ${props.accept && 'fileInput'}`}
        {...props}
      />
    </>
  );
};

export default Input;
