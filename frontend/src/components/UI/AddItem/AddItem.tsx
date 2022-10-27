import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import './addItem.scss';
import Button from '../Button/Button';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { addItem } from '../../../features/items/itemsSlice';

interface AddItemProps {
  setOpenAddItem: (arg: boolean) => void;
}
interface IFormData {
  name: string;
  type: string;
  description: string;
  price: string;
}

interface IForm extends IFormData {
  images: File | FileList | null;
  imageCover: File | null;
}

const AddItem: React.FC<AddItemProps> = ({ setOpenAddItem }) => {
  const dispatch = useAppDispatch();

  const typeOptions = [
    'кошельки и картхолдеры',
    'чехлы для очков',
    'обложки на паспорт',
  ];

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
      .catch((error) => console.log(error, 'error'));
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
          <div className="add-item__form__field">
            <label htmlFor="type" className="add-item__form__field-label">
              Тип товара
            </label>
            <select
              onChange={onChange}
              name="type"
              id="type"
              className="add-item__form__field-select"
            >
              {typeOptions.map((option) => (
                <option key={option} value={option}>
                  {option.split('')[0].toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <div className="add-item__form__field">
            <label htmlFor="name" className="add-item__form__field-label">
              Название
            </label>
            <input
              type="text"
              id="name"
              required
              className="add-item__form__field-input"
              placeholder="Crazy Horse Кошелек"
              onChange={onChange}
            />
          </div>
          <div className="add-item__form__field">
            <label htmlFor="price" className="add-item__form__field-label">
              Цена
            </label>
            <input
              type="number"
              id="price"
              required
              className="add-item__form__field-input"
              placeholder="1000"
              onChange={onChange}
            />
          </div>
          <div className="add-item__form__field">
            <label
              htmlFor="description"
              className="add-item__form__field-label"
            >
              Описание
            </label>
            <textarea
              id="description"
              name="description"
              className="add-item__form__field-input"
              placeholder="Введите описание товара"
              onChange={onChange}
            />
          </div>
          <div className="add-item__form__field">
            <label htmlFor="imageCover" className="add-item__form__field-label">
              Основное изображение
            </label>
            <input
              type="file"
              id="imageCover"
              name="imageCover"
              className="add-item__form__field-input"
              accept="image/jpeg, image/jpg"
              onChange={onChange}
            />
          </div>
          <div className="add-item__form__field">
            <label htmlFor="images" className="add-item__form__field-label">
              Дополнительные изображения (не более 3)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              className="add-item__form__field-input"
              accept="image/jpeg, image/jpg"
              onChange={onChange}
            />
          </div>
          <div className="add-item__form__btn">
            <Button onClick={() => {}} text="Добавить" color="grey" />
          </div>
        </form>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default AddItem;
