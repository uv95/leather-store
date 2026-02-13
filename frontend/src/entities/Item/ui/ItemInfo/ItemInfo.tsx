import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAddToCart } from '../../../../features/cart/api/useAddToCart';
import { RoutePath } from '../../../../shared/types/routePaths';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import { getUserRole, Role } from '../../../User';
import { Color, Item, LeatherType } from '../../model/types/item';
import ItemColorSelector from '../ItemColorSelector/ItemColorSelector';
import styles from './ItemInfo.module.scss';

interface ItemInfoProps {
  item: Item;
}

const ItemInfo: React.FC<ItemInfoProps> = ({ item }) => {
  const addItemToCart = useAddToCart();
  const navigate = useNavigate();
  const role = useSelector(getUserRole);

  const [leatherType, setLeatherType] = useState<LeatherType>(
    LeatherType.CRAZY_HORSE,
  );

  const [leatherColor, setLeatherColor] = useState<Color>(Color.BLACK);
  const [threadColor, setThreadColor] = useState<Color>(Color.BLACK);

  const cartItemDto = useMemo(() => {
    return {
      item: {
        _id: item._id,
        name: item.name,
        imageCover: item.imageCover,
      },
      quantity: 1,
      price: item.price,
      colors: {
        leather: leatherColor,
        thread: threadColor,
      },
      leatherType: leatherType,
    };
  }, [item, leatherType, leatherColor, threadColor]);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setLeatherType(target.value as LeatherType);
  };

  return (
    <>
      <h1 className={styles.title}>{item.name}</h1>
      <p className={styles.price}>${item.price}</p>
      <div className={styles.leatherType}>
        <p>Leather type:</p>
        <div className={styles.radio}>
          <div className={styles.radio__options}>
            {Object.values(LeatherType).map((type) => (
              <Input
                key={type}
                name="leather type"
                value={type}
                label={type}
                onChange={onChange}
                isChecked={leatherType === type}
                type="radio"
              />
            ))}
          </div>
          <Button
            className={styles.leatherTypeInfo}
            onClick={() => navigate(RoutePath.LEATHERS)}
            isSquare
            aria-label="Learn more about leather types"
            title="Learn more about leather types"
          >
            ?
          </Button>
        </div>
      </div>

      <ItemColorSelector
        setLeatherColor={setLeatherColor}
        setThreadColor={setThreadColor}
        leatherColor={leatherColor}
        threadColor={threadColor}
      />

      <div className={styles.descriptionHeading}>DESCRIPTION</div>
      <div className={styles.description}>{item.description}</div>

      {role !== Role.ADMIN && (
        <Button
          onClick={() => addItemToCart(cartItemDto)}
          theme={ButtonTheme.BLACK}
          size={ButtonSize.L}
        >
          Add to cart
        </Button>
      )}
    </>
  );
};

export default ItemInfo;
