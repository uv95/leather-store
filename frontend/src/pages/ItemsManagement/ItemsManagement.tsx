import { useCallback, useState } from 'react';
import { useGetAllItems } from '../../hooks/useGetAllItems';
import Button from '../../shared/ui/Button/Button';
import Modal from '../../shared/ui/Modal/Modal';
import Spinner from '../../shared/ui/Spinner/Spinner';
import { ItemListItem } from '../../widgets/ItemListItem';
import './itemsManagement.scss';
import { AddItemForm } from '../../features/addItem';

const ItemsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoading, items } = useGetAllItems();

  const onCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const onOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <>
      <div className="items">
        <h1 className="items-heading">Items</h1>
        <Button onClick={onOpenModal}>Add item</Button>
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
        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={onCloseModal}>
            <AddItemForm onSuccess={onCloseModal} />
          </Modal>
        )}
      </div>
    </>
  );
};

export default ItemsManagement;
