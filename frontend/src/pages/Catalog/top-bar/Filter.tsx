import React, { useState } from 'react';
import './top-bar.scss';
import Dropdown from './dropdown/Dropdown';
import Button from '../../../components/Button/Button';

const Filter = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter">
      <Button
        onClick={() => setOpen(!open)}
        text="Фильтр и сортировка"
        color="grey"
      />
      <Dropdown open={open} />
    </div>
  );
};

export default Filter;
