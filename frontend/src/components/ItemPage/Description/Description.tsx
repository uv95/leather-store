import React, { useState, useMemo } from 'react';
import './description.scss';
import SelectColor from '../../SelectColor/SelectColor';
import Button from '../../UI/Button/Button';
import { useAddToCart } from '../../../hooks/useAddToCart';
import Radio from '../../UI/Radio/Radio';
import { IItem } from '../../../types/data';
import Colors from '../../UI/Colors/Colors';
import { useNavigate } from 'react-router-dom';
import { LEATHERS_ROUTE } from '../../../utils/consts';
import { useAppSelector } from '../../../hooks';

interface DescriptionProps {
  item: IItem;
}

const Description: React.FC<DescriptionProps> = ({ item }) => {
  const addItemToCart = useAddToCart();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [openSelectLeatherColor, setOpenSelectLeatherColor] = useState(false);
  const [openSelectThreadsColor, setOpenSelectThreadsColor] = useState(false);

  const [leatherType, setLeatherType] = useState('Crazy Horse');
  const [colors, setColors] = useState({
    leatherColor: 'Black',
    threadsColor: 'Black',
  });

  const itemData = useMemo(() => {
    return {
      ...(!user && { _id: Date.now().toString() }),
      ...(!user && { total: +item.price }),
      itemId: item._id,
      name: item.name,
      quantity: 1,
      colors: {
        leatherColor: colors.leatherColor,
        threadsColor: colors.threadsColor,
      },
      leather: leatherType,
      price: +item.price,
      imageCover: item.imageCover.url,
      images: item.images.map((img) => img.url),
    };
  }, [item, colors, leatherType, user]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLeatherType(target.name);
  };

  return (
    <>
      {openSelectLeatherColor && (
        <SelectColor
          setOpenSelectColor={setOpenSelectLeatherColor}
          title="Choose leather color"
          type="leather"
          setColors={setColors}
          currColor={colors.leatherColor}
        />
      )}
      {openSelectThreadsColor && (
        <SelectColor
          setOpenSelectColor={setOpenSelectThreadsColor}
          title="Choose thread color"
          type="threads"
          setColors={setColors}
          currColor={colors.threadsColor}
        />
      )}
      <h1 className="item-title">{item.name}</h1>
      <p className="item-price">{item.price} RUB</p>
      <div className="leather-type">
        <p>Leather type:</p>
        <div className="leather-type__radio">
          <div className="leather-type__radio__options">
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
          <div
            className="leather-type-info"
            onClick={() => navigate(LEATHERS_ROUTE)}
          >
            ?
          </div>
        </div>
      </div>
      <Colors
        leatherColor={colors.leatherColor}
        threadsColor={colors.threadsColor}
        vertical
        openSelectLeatherColor={() => setOpenSelectLeatherColor(true)}
        openSelectThreadsColor={() => setOpenSelectThreadsColor(true)}
      />
      <div className="item-desc">DESCRIPTION</div>
      <div className="item-desc-text">{item.description}</div>
      <Button
        onClick={() => addItemToCart(itemData)}
        text="Add to cart"
        color="black"
        big
      />
    </>
  );
};

export default Description;
