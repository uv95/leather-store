import React, { useState } from 'react';
import './itemsManagement.scss';
import Button from '../../UI/Button/Button';
import AddItem from './AddItem/AddItem';
import { useGetAllItems } from '../../../hooks/useGetAllItems';
import { IItem } from '../../../types/data';
import ListItem from '../../UI/ListItem/ListItem';
import ItemDetails from './ItemDetails/ItemDetails';
import Toast from '../../UI/Toast/Toast';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';

const ItemsManagement = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastText, setToastText] = useState('');
  const { isLoading, items } = useGetAllItems();
  const itemData = (item: IItem) => [
    {
      dataItem: {
        imgPath: require(`../../../assets/img/items/${item.imageCover}`),
      },
    },
    { dataItem: 'ID: ' + item._id.slice(0, 8) },
    { dataItem: item.name },
    { dataItem: item.type.split('')[0].toUpperCase() + item.type.slice(1) },
    {
      dataItem: item.price + ' руб.',
    },
  ];

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
        <Button
          onClick={() => setOpenModal(true)}
          text="Добавить товар"
          color="grey"
        />
        <div className="items__container">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {(!items || !items.length) && (
                <p className="items__container-empty">Товаров нет</p>
              )}
              {items.length !== 0 &&
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
            </>
          )}
        </div>
        {openModal && (
          <Modal
            setOpen={setOpenModal}
            Content={
              <AddItem
                setOpenAddItem={setOpenModal}
                setToastText={setToastText}
                setOpenToast={setOpenToast}
              />
            }
          />
        )}
      </div>
    </>
  );
};

export default ItemsManagement;
