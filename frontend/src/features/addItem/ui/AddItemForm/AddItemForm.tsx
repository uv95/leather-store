import React, { useState } from 'react';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import './addItemForm.scss';
import toast from '../../../../shared/lib/toast/toast';
import { ItemDto, ItemType, createItem } from '../../../../entities/Item';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';

interface AddItemFormProps {
  onSuccess: () => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onSuccess }) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<
    Omit<ItemDto, 'imageCover' | 'images'>
  >({
    name: '',
    type: ItemType.WALLETS,
    description: '',
    price: 0,
  });

  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File | FileList | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const itemDto = new FormData();
    itemDto.append('name', formData.name);
    itemDto.append('type', formData.type);
    itemDto.append('description', formData.description);
    itemDto.append('price', String(formData.price));

    if (imageCover) {
      itemDto.append('imageCover', imageCover);
    }
    if (images) {
      for (let i = 0; i < 2; i++) {
        itemDto.append('images', Object.values(images!)[i]);
      }
    }

    setIsLoading(true);

    dispatch(createItem(itemDto))
      .unwrap()
      .then(() => {
        onSuccess();
        toast.success('New item successfully added');
      })
      .catch((error: string) => toast.error(error))
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
          <Button
            type="submit"
            disabled={isLoading}
            theme={ButtonTheme.BLACK}
            size={ButtonSize.L}
          >
            Add
          </Button>
        </div>
      </form>
    </>
  );
};

export default AddItemForm;
