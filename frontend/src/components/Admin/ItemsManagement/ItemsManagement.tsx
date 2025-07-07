import { useState } from 'react';
import { clearFilter } from '../../../features/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useGetAllItems } from '../../../hooks/useGetAllItems';
import { IItem } from '../../../types/data';
import Button from '../../UI/Button/Button';
import ListItem from '../../UI/ListItem/ListItem';
import Modal from '../../UI/Modal/Modal';
import Spinner from '../../UI/Spinner/Spinner';
import Toast from '../../UI/Toast/Toast';
import AddItem from './AddItem/AddItem';
import ItemDetails from './ItemDetails/ItemDetails';
import './itemsManagement.scss';

const ItemsManagement = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);

  const [openModal, setOpenModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);
  const [toastText, setToastText] = useState('');

  if (filters.length) {
    dispatch(clearFilter());
  }

  const { isLoading, items } = useGetAllItems();
  const itemData = (item: IItem) => [
    {
      dataItem: { imageCover: item.imageCover.url },
    },
    { dataItem: 'ID: ' + item._id.slice(0, 8) },
    { dataItem: item.name },
    { dataItem: item.type.split('')[0].toUpperCase() + item.type.slice(1) },
    {
      dataItem: `$${item.price}`,
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
        <h1 className="items-heading">Items</h1>
        <Button onClick={() => setOpenModal(true)}>Add item</Button>
        <div className="items__container">
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {(!items || !items.length) && (
                <p className="items__container-empty">No items</p>
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
