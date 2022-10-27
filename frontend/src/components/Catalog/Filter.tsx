import React, { useState } from 'react';
import './filter_view.scss';
import Dropdown from './Dropdown/Dropdown';
import Button from '../../components/UI/Button/Button';

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
