import React from 'react';
import './radio.scss';

type RadioProps = {
  checked: boolean;
  onChange: (arg: React.FormEvent<HTMLInputElement>) => void;
  name: string;
};

const Radio = ({ checked, onChange, name }: RadioProps) => {
  return (
    <label>
      <input
        type="radio"
        name={name}
        checked={checked}
        className="leather-type__radio-input"
        onChange={onChange}
      />
      {name}
    </label>
  );
};

export default Radio;
