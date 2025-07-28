import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { useAddToCart } from '../../../hooks/useAddToCart';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import Button, {
  ButtonColor,
  ButtonSize,
} from '../../../shared/ui/Button/Button';
import Colors, { ColorsPosition } from '../../../shared/ui/Colors/Colors';
import Radio from '../../../shared/ui/Radio/Radio';
import { Color, ItemPart, LeatherType, Role } from '../../../types/data';
import SelectColor from '../../SelectColor/SelectColor';
import './description.scss';
import { Item, ItemType } from '../../../entities/Item/model/types/item';

interface DescriptionProps {
  item: Item;
}

const Description: React.FC<DescriptionProps> = ({ item }) => {
  const addItemToCart = useAddToCart();
  const navigate = useNavigate();
  const { role } = useAppSelector((state) => state.auth);

  const [openSelectLeatherColor, setOpenSelectLeatherColor] = useState(false);
  const [openSelectThreadsColor, setOpenSelectThreadsColor] = useState(false);

  const [leatherType, setLeatherType] = useState<LeatherType>(
    LeatherType.CRAZY_HORSE
  );
  const [colors, setColors] = useState({
    leatherColor: Color.BLACK,
    threadsColor: Color.BLACK,
  });

  const itemData = useMemo(() => {
    return {
      _id: item._id,
      total: +item.price,
      item: {
        name: item.name,
        price: +item.price,
        imageCover: item.imageCover,
        type: item.type as ItemType,
      },
      quantity: 1,
      colors: {
        leatherColor: colors.leatherColor,
        threadsColor: colors.threadsColor,
      },
      leather: leatherType,
    };
  }, [item, colors, leatherType]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLeatherType(target.name as LeatherType);
  };

  return (
    <>
      {[ItemPart.LEATHER, ItemPart.THREAD].map((itemPart) => {
        if (
          itemPart === ItemPart.LEATHER
            ? !openSelectLeatherColor
            : !openSelectThreadsColor
        ) {
          return null;
        }
        return (
          <SelectColor
            key={itemPart}
            setOpenSelectColor={
              itemPart === ItemPart.LEATHER
                ? setOpenSelectLeatherColor
                : setOpenSelectThreadsColor
            }
            title={`Select ${itemPart} color`}
            type={itemPart}
            setColors={setColors}
            currColor={
              itemPart === ItemPart.LEATHER
                ? colors.leatherColor
                : colors.threadsColor
            }
          />
        );
      })}

      <h1 className="item-title">{item.name}</h1>
      <p className="item-price">${item.price}</p>
      <div className="leather-type">
        <p>Leather type:</p>
        <div className="leather-type__radio">
          <div className="leather-type__radio__options">
            {Object.values(LeatherType).map((type) => (
              <Radio
                key={type}
                name={type}
                onChange={onChange}
                checked={leatherType === type}
              />
            ))}
          </div>
          <div
            className="leather-type-info"
            onClick={() => navigate(RoutePath.LEATHERS)}
          >
            ?
          </div>
        </div>
      </div>
      <Colors
        leatherColor={colors.leatherColor}
        threadColor={colors.threadsColor}
        position={ColorsPosition.VERTICAL}
        openSelectLeatherColor={() => setOpenSelectLeatherColor(true)}
        openSelectThreadsColor={() => setOpenSelectThreadsColor(true)}
      />
      <div className="item-desc">DESCRIPTION</div>
      <div className="item-desc-text">{item.description}</div>
      {role !== Role.ADMIN && (
        <Button
          onClick={() => addItemToCart(itemData)}
          color={ButtonColor.BLACK}
          size={ButtonSize.L}
        >
          Add to cart
        </Button>
      )}
    </>
  );
};

export default Description;
