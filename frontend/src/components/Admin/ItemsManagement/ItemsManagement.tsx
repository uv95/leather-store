import React, { useEffect, useState } from 'react';
import './itemsManagement.scss';
import Button from '../../UI/Button/Button';
import AddItem from '../../UI/AddItem/AddItem';
import { ReactComponent as Delete } from '../../../assets/icons/trash.svg';
import { ReactComponent as Edit } from '../../../../assets/icons/edit.svg';
import { useAppDispatch } from '../../../hooks';
import { deleteItem } from '../../../features/items/itemsSlice';
import { useGetAllItems } from '../../../hooks/useGetAllItems';
import { IItem } from '../../../types/data';
import ListItem from '../../UI/ListItem/ListItem';
import ItemDetails from './ItemDetails/ItemDetails';

const ItemsManagement = () => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const { isLoading, items } = useGetAllItems();
  const dispatch = useAppDispatch();

  const itemData = (item: IItem) => [
    {
      dataItem: {
        imgPath: require(`../../../assets/img/items/${item.imageCover}`),
      },
    },
    { dataItem: 'ID: ' + item._id.slice(0, 6) },
    { dataItem: item.name },
    { dataItem: item.type.split('')[0].toUpperCase() + item.type.slice(1) },
    {
      dataItem: item.price + ' руб.',
    },
  ];

  const addItem = () => {
    setOpenAddItem(true);
  };

  const onDelete = (id: string) => {
    dispatch(deleteItem(id))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  };

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="items">
      <h1 className="items-heading">Товары</h1>
      <Button onClick={addItem} text="Добавить товар" color="grey" />
      <div className="items__container">
        {!items.length && <p>Товаров нет</p>}
        {items.map((item) => (
          <ListItem
            key={item._id}
            Details={<ItemDetails item={item} />}
            bg="grey"
            data={itemData(item)}
          />
        ))}
      </div>
      {openAddItem && <AddItem setOpenAddItem={setOpenAddItem} />}
    </div>
  );
};

export default ItemsManagement;
