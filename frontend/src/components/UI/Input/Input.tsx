import React from 'react';
import './input.scss';

interface InputProps {
  onChange: (arg: React.FormEvent<HTMLInputElement>) => void;
  name: string;
  value?: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  accept?: string;
  multiple?: boolean;
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
        className={`input ${props.accept && 'fileInput'}`}
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        required={props.required}
        placeholder={props.placeholder}
        onChange={props.onChange}
        accept={props.accept}
        multiple={props.multiple}
      />
    </>
  );
};

export default Input;
