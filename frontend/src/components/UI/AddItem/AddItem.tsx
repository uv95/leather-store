import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import './addItem.scss';
import Button from '../Button/Button';
import { useAppDispatch } from '../../../hooks';
import { addItem } from '../../../features/items/itemsSlice';
import Input from '../Input/Input';
import { typeOptions } from '../../../utils/consts';
import Toast from '../Toast/Toast';

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
    type: '' || typeOptions[0],
    description: '',
    price: '',
  });

  const [imageCover, setImageCover] = useState<File | null>(null);
  const [images, setImages] = useState<File | FileList | null>(null);

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

    dispatch(addItem(form))
      .unwrap()
      .then(() => {
        setOpenAddItem(false);
      })
      .catch((error) => {
        setToastText(error.split(':')[error.split(':').length - 1]);
        setOpenToast(true);
      });
  };
  const onChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.id === 'imageCover')
      setImageCover(target.files![0]);

    if (target.files && target.id === 'images') setImages(target.files);

    if (!target.files)
      setFormData((prev) => ({
        ...prev,
        [target.id]: target.id === 'price' ? +target.value : target.value,
      }));
  };

  return ReactDOM.createPortal(
    <div className="background" onClick={() => setOpenAddItem(false)}>
      <div className="add-item" onClick={(e) => e.stopPropagation()}>
        <h1 className="add-item-title">Добавить товар</h1>
        <form className="add-item__form" id="form" onSubmit={onSubmit}>
          <div className="add-item__form__box">
            <label htmlFor="type" className="add-item__form__box-label">
              Тип товара
            </label>
            <select
              onChange={onChange}
              name="type"
              id="type"
              className="add-item__form__box-select"
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option.split('')[0].toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="add-item__form__box">
            <Input
              name="name"
              label="Название"
              type="text"
              onChange={onChange}
              placeholder="Crazy Horse Кошелек"
            />
          </div>
          <div className="add-item__form__box">
            <Input
              name="price"
              label="Цена"
              type="number"
              onChange={onChange}
              placeholder="1000"
            />
          </div>
          <div className="add-item__form__box">
            <label htmlFor="description" className="add-item__form__box-label">
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              className="add-item__form__box-input"
              placeholder="Введите описание товара"
              onChange={onChange}
            />
          </div>
          <div className="add-item__form__box">
            <Input
              name="imageCover"
              label="Основное изображение"
              type="file"
              onChange={onChange}
              accept="image/jpeg, image/jpg"
            />
          </div>
          <div className="add-item__form__box">
            <Input
              name="images"
              label="Дополнительные изображения (не более 3)"
              type="file"
              onChange={onChange}
              accept="image/jpeg, image/jpg"
              multiple
            />
          </div>
          <div className="add-item__form__btn">
            <Button text="Добавить" color="grey" />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default AddItem;
