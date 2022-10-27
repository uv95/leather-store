import React, { useEffect, useState } from 'react';
import './itemsManagement.scss';
import Button from '../../UI/Button/Button';
import Table from './Table/Table';
import AddItem from '../../UI/AddItem/AddItem';

const ItemsManagement = () => {
  const [openAddItem, setOpenAddItem] = useState(false);

  const addItem = () => {
    setOpenAddItem(true);
  };

  return (
    <div className="management">
      <h1 className="management-heading">Товары</h1>
      <div className="management__buttons">
        <Button onClick={addItem} text="Добавить товар" color="grey" />
      </div>
      <Table />
      {openAddItem && <AddItem setOpenAddItem={setOpenAddItem} />}
    </div>
  );
};

export default ItemsManagement;
