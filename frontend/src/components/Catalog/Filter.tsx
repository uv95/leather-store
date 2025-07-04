import { useState } from 'react';
import Button from '../UI/Button/Button';
import Dropdown from './Dropdown/Dropdown';
import './filter_view.scss';

const Filter = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="filter">
      <Button onClick={() => setOpen(!open)}>Filter and sort</Button>
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
