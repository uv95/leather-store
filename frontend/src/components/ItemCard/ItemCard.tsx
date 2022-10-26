import React from 'react';
import './itemCard.scss';
import { ItemData } from '../../features/items/itemsService';

interface ItemCardProps {
  item: ItemData;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <div className="item-card">
      <div className="item-card__img">
        <img
          src={require(`../../assets/img/items/${item.imageCover}`)}
          alt=""
          className="item-card__img--item"
        />
      </div>
      <div className="item-card__text">
        <p className="item-card__text--name">{item.name}</p>
        <p className="item-card__text--price">{item.price} руб</p>
      </div>
    </div>
  );
};

export default ItemCard;
