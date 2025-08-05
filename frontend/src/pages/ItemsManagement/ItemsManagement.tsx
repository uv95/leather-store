import { useCallback, useState } from 'react';
import { useGetAllItems } from '../../shared/lib/hooks/useGetAllItems';
import Button from '../../shared/ui/Button/Button';
import Modal from '../../shared/ui/Modal/Modal';
import Spinner from '../../shared/ui/Spinner/Spinner';
import { ItemListItem } from '../../widgets/ItemListItem';
import './itemsManagement.scss';
import { AddItemForm } from '../../features/addItem';
import { getItemsLoading } from '../../entities/Item';
import { useSelector } from 'react-redux';

const ItemsManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useGetAllItems();
  const loading = useSelector(getItemsLoading);

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
        <Button className="add-item-button" onClick={onOpenModal}>
          Add item
        </Button>
        <div className="items__container">
          {loading === 'pending' && <Spinner />}
          {loading === 'succeeded' && (
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
