import React from 'react';
import './itemCard.scss';
import { IItem } from '../../../types/data';
import { Link } from 'react-router-dom';
import { ITEM_ROUTE } from '../../../utils/consts';

interface ItemCardProps {
  item: IItem;
}

const ItemCard: React.FC<ItemCardProps> = React.memo(({ item }) => {
  return (
    <Link to={ITEM_ROUTE + item.slug} className="item-card">
      <div className="item-card__img">
        <img
          src={item.imageCover.url}
          alt={item.name}
          className="item-card__img--item"
        />
      </div>
      <div className="item-card__text">
        <p className="item-card__text--name">{item.name}</p>
        <p className="item-card__text--price">{item.price} RUB</p>
      </div>
    </Link>
  );
});

export default ItemCard;
