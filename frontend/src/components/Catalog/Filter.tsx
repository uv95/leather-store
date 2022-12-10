import React from 'react';
import './filter_view.scss';
import Dropdown from './Dropdown/Dropdown';
import Button from '../UI/Button/Button';

type FilterProps = {
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
};

const Filter = ({ setSort, sort, setOpen, open }: FilterProps) => {
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
