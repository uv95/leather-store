import React, { useState } from 'react';
import './itemsManagement.scss';
import Button from '../../../components/Button/Button';
import Table from '../../../components/Table/Table';
import AddItem from '../../../components/AddItem/AddItem';
import AddType from '../../../components/AddType/AddType';

type Props = {};

const ItemsManagement = (props: Props) => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openAddType, setOpenAddType] = useState(false);

  const addItem = () => {
    setOpenAddItem(true);
  };
  const addType = () => {
    setOpenAddType(true);
  };

  return (
    <div className="management">
      <h1 className="management-title">Товары</h1>
      <div className="management__buttons">
        <Button onClick={addItem} text="Добавить товар" color="grey" />
        <Button onClick={addType} text="Добавить тип товара" color="grey" />
      </div>
      <Table />
      {openAddItem && <AddItem setOpenAddItem={setOpenAddItem} />}
      {openAddType && <AddType setOpenAddType={setOpenAddType} />}
    </div>
  );
};

export default ItemsManagement;
