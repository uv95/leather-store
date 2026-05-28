import React, { useState } from 'react';
import {
  deleteItem,
  Item,
  ItemDto,
  ItemType,
  updateItem,
} from '../../../../entities/Item';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import styles from './ItemDetails.module.scss';

type ItemDetailsProps = { item: Item };

const ItemDetails = ({ item }: ItemDetailsProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<AllOptional<ItemDto>>({
    name: item.name,
    type: item.type,
    description: item.description,
    price: item.price,
  });

  const { name, type, description, price } = formData;

  const onClick = (e: React.FormEvent, action: 'delete' | 'update') => {
    e.preventDefault();
    setIsLoading(true);

    try {
      action === 'delete'
        ? dispatch(deleteItem({ itemId: item._id }))
        : dispatch(updateItem({ itemId: item._id, dto: formData }));

      setIsLoading(false);
      toast.success(`Item ${action === 'delete' ? 'deleted' : 'updated'}`);
    } catch (error) {
      setIsLoading(false);
      toast.error(error as string);
    }
  };

  const onChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <div className={styles.ItemDetails}>
      <form className={styles.form} id="item-details-form">
        <div className={styles.section}>
          <div className={styles.inputContainer}>
            <Input
              name="name"
              label="Name"
              type="text"
              value={name}
              onChange={onChange}
              placeholder="Crazy Horse Wallet"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="type">Item type</label>
            <select
              onChange={onChange}
              name="type"
              value={type}
              id="type"
              className={styles.select}
            >
              {Object.values(ItemType).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.inputContainer}>
            <Input
              name="price"
              label="Price"
              value={price}
              type="number"
              onChange={onChange}
              placeholder="1000"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={description}
              placeholder="Enter item description"
              onChange={onChange}
            />
          </div>
        </div>
        <div className={styles.buttons}>
          <Button
            theme={ButtonTheme.BLACK}
            size={ButtonSize.L}
            onClick={(e) => onClick(e, 'update')}
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            theme={ButtonTheme.OUTLINE}
            size={ButtonSize.L}
            onClick={(e) => onClick(e, 'delete')}
            disabled={isLoading}
            aria-label={`Delete item "${item.name}"`}
          >
            Delete
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ItemDetails;
