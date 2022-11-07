import React, { useState, useEffect } from 'react';
import './description.scss';
import black from '../../../assets/img/black.jpg';
import SelectColor from '../../SelectColor/SelectColor';
import Button from '../../UI/Button/Button';
import { useAddToCart } from '../../../hooks/useAddToCart';
import Radio from '../../UI/Radio/Radio';
import { IItem } from '../../../types/data';

interface DescriptionProps {
  item: IItem;
}

const Description: React.FC<DescriptionProps> = ({ item }) => {
  const addItemToCart = useAddToCart();

  const [openSelectLeatherColor, setOpenSelectLeatherColor] = useState(false);
  const [openSelectThreadsColor, setOpenSelectThreadsColor] = useState(false);
  const [leatherType, setLeatherType] = useState('Crazy Horse');
  const [colors, setColors] = useState({
    leatherColor: 'Черный',
    threadsColor: 'Черный',
  });
  const [cartItemData, setCartItemData] = useState({
    itemId: item._id,
    name: item.name,
    quantity: 1,
    colors: {
      leatherColor: colors.leatherColor,
      threadsColor: colors.threadsColor,
    },
    leather: leatherType,
    price: +item.price,
    imageCover: item.imageCover,
    images: item.images,
  });

  useEffect(() => {
    setCartItemData((prev) => ({
      ...prev,
      colors: {
        leatherColor: colors.leatherColor,
        threadsColor: colors.threadsColor,
      },
      leather: leatherType,
    }));
  }, [colors, leatherType]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLeatherType(target.name);
  };

  return (
    <>
      {openSelectLeatherColor && (
        <SelectColor
          setOpenSelectColor={setOpenSelectLeatherColor}
          title="Выберите цвет кожи"
          type="leather"
          setColors={setColors}
          currColor={colors.leatherColor}
        />
      )}
      {openSelectThreadsColor && (
        <SelectColor
          setOpenSelectColor={setOpenSelectThreadsColor}
          title="Выберите цвет ниток"
          type="threads"
          setColors={setColors}
          currColor={colors.threadsColor}
        />
      )}
      <h1 className="item-title">{item.name}</h1>
      <p className="item-price">{item.price} руб</p>
      <div className="leather-type">
        <p>Тип кожи:</p>
        <div className="leather-type__radio">
          <Radio
            name="Crazy Horse"
            onChange={onChange}
            checked={leatherType === 'Crazy Horse'}
          />
          <Radio
            name="Nappa"
            onChange={onChange}
            checked={leatherType === 'Nappa'}
          />
          <Radio
            name="Pull Up"
            onChange={onChange}
            checked={leatherType === 'Pull Up'}
          />
        </div>
      </div>
      <div className="colors">
        <div className="colors-btn">
          <p>Цвет кожи</p>
          <img
            src={black}
            alt=""
            className="colors-btn__img"
            onClick={() => setOpenSelectLeatherColor(true)}
          />
        </div>
        <div className="colors-btn">
          <p>Нитки</p>
          <img
            src={black}
            alt=""
            className="colors-btn__img"
            onClick={() => setOpenSelectThreadsColor(true)}
          />
        </div>
      </div>
      <div className="item-desc">ОПИСАНИЕ</div>
      <div className="item-desc-text">
        {item.description} Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Et est, illum rerum tempora placeat natus hic quos ad quasi magnam
        recusandae tenetur saepe. Consequatur, provident. Nostrum quos similique
        veritatis saepe.
      </div>
      <Button
        onClick={() => addItemToCart(cartItemData)}
        text="В корзину"
        color="black"
        big
      />
    </>
  );
};

export default Description;