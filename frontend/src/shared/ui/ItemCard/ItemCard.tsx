import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types/routePaths';
import './itemCard.scss';
import { Item } from '../../../entities/Item';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = React.memo(({ item }) => {
  return (
    <Link to={RoutePath.ITEM_PAGE.replace(':slug', item.slug)}>
      <div className="item-card__img">
        <img
          src={item.imageCover.url}
          alt={item.name}
          className="item-card__img--item"
        />
      </div>
      <div className="item-card__text">
        <p className="item-card__text--name">{item.name}</p>
        <p className="item-card__text--price">${item.price}</p>
      </div>
    </Link>
  );
});

export default ItemCard;
