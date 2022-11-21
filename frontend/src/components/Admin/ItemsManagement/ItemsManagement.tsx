import React, { useEffect, useState } from 'react';
import './itemsManagement.scss';
import Button from '../../UI/Button/Button';
import AddItem from '../../UI/AddItem/AddItem';
import { useGetAllItems } from '../../../hooks/useGetAllItems';
import { IItem } from '../../../types/data';
import ListItem from '../../UI/ListItem/ListItem';
import ItemDetails from './ItemDetails/ItemDetails';
import Toast from '../../UI/Toast/Toast';

const ItemsManagement = () => {
  const [openAddItem, setOpenAddItem] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const { isLoading, items } = useGetAllItems();
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

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <>
      {openToast && (
        <Toast
          text={toastText}
          type="error"
          opened={openToast}
          setOpened={setOpenToast}
        />
      )}
      <div className="items">
        <h1 className="items-heading">Товары</h1>
        <Button onClick={addItem} text="Добавить товар" color="grey" />
        <div className="items__container">
          {(!items || !items.length) && <p>Товаров нет</p>}
          {items.length &&
            items.map((item) => (
              // <div className="items__container__item" key={item._id}>
              <ListItem
                key={item._id}
                Details={<ItemDetails item={item} />}
                bg="grey"
                data={itemData(item)}
              />
              //   <div className="items__container__item-delete">
              //     <Delete onClick={() => onDelete(item._id)} />
              //   </div>
              // </div>
            ))}
        </div>
        {openAddItem && (
          <AddItem
            setOpenAddItem={setOpenAddItem}
            setToastText={setToastText}
            setOpenToast={setOpenToast}
          />
        )}
      </div>
    </>
  );
};

export default ItemsManagement;
