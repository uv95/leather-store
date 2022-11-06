import React from 'react';
import './radio.scss';

type RadioProps = {
  checked: boolean;
  label: string;
  onChange: (arg: React.FormEvent<HTMLInputElement>) => void;
  name: string;
};

const Radio = ({ checked, label, onChange, name }: RadioProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        checked={checked}
        className="leather-type__radio-input"
        onChange={onChange}
      />
      {label}
    </label>
  );
};

export default Radio;
