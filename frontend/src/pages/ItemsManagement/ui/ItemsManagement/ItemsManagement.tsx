import { useCallback, useState } from 'react';
import { AddItemForm } from '../../../../features/addItem';
import Button from '../../../../shared/ui/Button/Button';
import Modal from '../../../../shared/ui/Modal/Modal';
import { ItemList } from '../ItemList/ItemList';
import './itemsManagement.scss';
import { getItemsLoading } from '../../../../entities/Item';
import { useSelector } from 'react-redux';
import ItemListSkeleton from '../ItemListSkeleton/ItemListSkeleton';
import useGetAllItems from '../../../../shared/lib/hooks/useGetItems';

const ItemsManagement = () => {
  const loading = useSelector(getItemsLoading);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { items } = useGetAllItems();

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
          {loading === 'pending' && <ItemListSkeleton />}
          {loading === 'succeeded' && <ItemList items={items} />}
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
