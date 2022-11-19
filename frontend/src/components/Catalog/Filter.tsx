import React, { useState } from 'react';
import './filter_view.scss';
import Dropdown from './Dropdown/Dropdown';
import Button from '../../components/UI/Button/Button';

type FilterProps = {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
};

const Filter = ({ setSort, sort }: FilterProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="filter">
      <Button
        onClick={() => setOpen(!open)}
        text="Фильтр и сортировка"
        color="grey"
      />
      <Dropdown open={open} setSort={setSort} sort={sort} />
    </div>
  );
};

export default Filter;
