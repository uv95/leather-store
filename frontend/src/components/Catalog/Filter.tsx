import React, { useState } from 'react';
import './filter_view.scss';
import Dropdown from './Dropdown/Dropdown';
import Button from '../UI/Button/Button';

const Filter = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="filter">
      <Button
        onClick={() => setOpen(!open)}
        text="Фильтр и сортировка"
        color="grey"
      />
      {open && (
        <>
          <div
            className="filter-background"
            onClick={() => setOpen(false)}
          ></div>
          <Dropdown open={open} />{' '}
        </>
      )}
    </div>
  );
};

export default Filter;
