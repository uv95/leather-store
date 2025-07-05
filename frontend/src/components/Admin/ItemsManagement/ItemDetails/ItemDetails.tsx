import React, { useEffect, useState } from 'react';
import { deleteItem, updateItem } from '../../../../features/items/itemsSlice';
import { useAppDispatch } from '../../../../hooks';
import { IItem, ItemType } from '../../../../types/data';
import Button, { ButtonColor, ButtonSize } from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './itemDetails.scss';

type ItemDetailsProps = { item: IItem };

const ItemDetails = ({ item }: ItemDetailsProps) => {
  // const [newImageCover, setNewImageCover] = useState('');
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Partial<IItem>>({
    name: '',
    type: '',
    description: '',
    price: '',
    // imageCover: '',
    // images: [],
  });

  const { name, type, description, price } = formData;
  // const { name, type, description, price, imageCover, images } = formData;

  const onDelete = (id: string) => {
    dispatch(deleteItem(id))
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  };

  useEffect(() => {
    setFormData({
      name: item.name,
      type: item.type,
      description: item.description,
      price: item.price,
      // imageCover: item.imageCover,
      // images: item.images,
    });
  }, [item]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateItem({ itemId: item._id, updatedItem: formData }))
      .unwrap()
      .then((data) => console.log(data))
      .catch((error) => console.log(error, 'error'));
  };
  const onChange = (
    e: React.FormEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  return (
    <div className="itemDetails">
      <form className="itemDetails__form" id="form" onSubmit={onSubmit}>
        <div className="itemDetails__form__section">
          <div className="itemDetails__form__box">
            <Input
              name="name"
              label="Name"
              type="text"
              value={name}
              onChange={onChange}
              placeholder="Crazy Horse Wallet"
            />
          </div>
          <div className="itemDetails__form__box">
            <label htmlFor="type" className="itemDetails__form__box-label">
              Item type
            </label>
            <select
              onChange={onChange}
              name="type"
              value={type}
              id="type"
              className="itemDetails__form__box-select"
            >
              {Object.values(ItemType).map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="itemDetails__form__section">
          <div className="itemDetails__form__box">
            <Input
              name="price"
              label="Price"
              value={price}
              type="number"
              onChange={onChange}
              placeholder="1000"
            />
          </div>
          <div className="itemDetails__form__box">
            <label
              htmlFor="description"
              className="itemDetails__form__box-label"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={description}
              className="itemDetails__form__box-input"
              placeholder="Enter item description"
              onChange={onChange}
            />
          </div>
        </div>
        {/* TODO */}
        {/* <div className="itemDetails__form__box__images">
          {[item.imageCover, ...item.images].map((img, i) => (
            <div className="itemDetails__form__box__images-img">
              <img
                src={require(`../../../../assets/img/items/${img}`)}
                alt="item pic"
              />
              {i === 0 ? (
                <p>Main photo</p>
              ) : (
                <p className="makeCover" onClick={() => setNewImageCover(img)}>
                  Set as main
                </p>
              )}

              {/* <div className="itemDetails__form__box__images-img-delete">
                &#9587;
              </div>
            </div>
          ))}
        </div> 
        <div className="itemDetails__form__section">
          <div className="itemDetails__form__box">
            <Input
              name="imageCover"
              label="Main image"
              type="file"
              onChange={onChange}
              accept="image/jpeg, image/jpg"
            />
          </div>
          <div className="itemDetails__form__box">
            <Input
              name="images"
              label="Additional images (up to 3)"
              type="file"
              onChange={onChange}
              accept="image/jpeg, image/jpg"
              multiple
            />
          </div>
        </div> */}
        <Button color={ButtonColor.BLACK} size={ButtonSize.L}>
          Save
        </Button>
        <p
          className="itemDetails__form-delete"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </p>
      </form>
    </div>
  );
};

export default ItemDetails;
