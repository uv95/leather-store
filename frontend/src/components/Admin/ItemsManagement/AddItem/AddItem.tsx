import React, { useState } from 'react';
import { addItem } from '../../../../features/items/itemsSlice';
import { useAppDispatch } from '../../../../hooks';
import { ItemType } from '../../../../types/data';
import Button from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './addItem.scss';

interface AddItemProps {
  setOpenAddItem: React.Dispatch<React.SetStateAction<boolean>>;
  setToastText: React.Dispatch<React.SetStateAction<string>>;
  setOpenToast: React.Dispatch<React.SetStateAction<boolean>>;
}
interface IFormData {
  name: string;
  type: string;
  description: string;
  price: string;
}

const AddItem: React.FC<AddItemProps> = ({
  setOpenAddItem,
  setOpenToast,
  setToastText,
}) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<IFormData>({
    name: '',
    type: ItemType.WALLETS,
    description: '',
    price: '',
  });

  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File | FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData();
    form.append('name', formData.name);
    form.append('type', formData.type);
    form.append('description', formData.description);
    form.append('price', formData.price);
    if (imageCover) form.append('imageCover', imageCover);
    if (images) {
      for (let i = 0; i < 2; i++) {
        form.append('images', Object.values(images!)[i]);
      }
    }

    setIsLoading(true);

    dispatch(addItem(form))
      .unwrap()
      .then(() => {
        setOpenAddItem(false);
      })
      .catch((error) => {
        setToastText(error.split(':')[error.split(':').length - 1]);
        setOpenToast(true);
      })
      .finally(() => setIsLoading(false));
  };

  const onChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;

    if (target.files && target.name === 'imageCover')
      setImageCover(target.files![0]);

    if (target.files && target.name === 'images') {
      setImages(target.files);
    }

    if (!target.files) {
      setFormData((prev) => ({
        ...prev,
        [target.name]: target.name === 'price' ? +target.value : target.value,
      }));
    }
  };

  return (
    <>
      <h1 className="title">Add Item</h1>
      <form className="form" id="form" onSubmit={onSubmit}>
        <div className="form__box">
          <label htmlFor="type" className="form__box-label">
            Item type
          </label>
          <select
            onChange={onChange}
            name="type"
            id="type"
            className="form__box-select"
            disabled={isLoading}
          >
            {Object.values(ItemType).map((option) => (
              <option key={option} value={option}>
                {option.split('')[0].toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="form__box">
          <Input
            name="name"
            label="Name"
            type="text"
            onChange={onChange}
            placeholder="Crazy Horse Wallet"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form__box">
          <Input
            name="price"
            label="Price"
            type="number"
            onChange={onChange}
            placeholder="1000"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form__box">
          <label htmlFor="description" className="form__box-label">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="form__box-input"
            placeholder="Enter item description"
            onChange={onChange}
            disabled={isLoading}
            required
          />
        </div>
        <div className="form__box">
          <Input
            name="imageCover"
            label="Main image"
            type="file"
            onChange={onChange}
            accept="image/jpeg, image/jpg"
            disabled={isLoading}
            required
          />
        </div>
        <div className="form__box">
          <Input
            name="images"
            label="Additional images (up to 3)"
            type="file"
            onChange={onChange}
            accept="image/jpeg, image/jpg"
            disabled={isLoading}
            multiple
          />
        </div>
        <div className="form__btn">
          <Button type="submit" disabled={isLoading}>
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddItem;
