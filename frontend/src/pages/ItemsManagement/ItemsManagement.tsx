import { useState } from 'react';
import AddItem from '../../components/Admin/ItemsManagement/AddItem/AddItem';
import { clearFilter } from '../../features/filters/filtersSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useGetAllItems } from '../../hooks/useGetAllItems';
import Button from '../../shared/ui/Button/Button';
import Modal from '../../shared/ui/Modal/Modal';
import Spinner from '../../shared/ui/Spinner/Spinner';
import { ItemListItem } from '../../widgets/ItemListItem';
import './itemsManagement.scss';

const ItemsManagement = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.filters);
  const [openModal, setOpenModal] = useState(false);

  if (filters.length) {
    dispatch(clearFilter());
  }

  const { isLoading, items } = useGetAllItems();

  return (
    <>
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
                  <ItemListItem key={item._id} item={item} />
                ))}
            </>
          )}
        </div>
        {openModal && (
          <Modal
            setOpen={setOpenModal}
            Content={<AddItem setOpenAddItem={setOpenModal} />}
          />
        )}
      </div>
    </>
  );
};

export default ItemsManagement;
