import React from 'react';
import './itemCard.scss';
import { ItemData } from '../../../features/items/itemsService';
import { Link } from 'react-router-dom';
import { ITEM_ROUTE } from '../../../utils/consts';

interface ItemCardProps {
  item: ItemData;
}

const ItemCard: React.FC<ItemCardProps> = ({ item }) => {
  return (
    <Link to={ITEM_ROUTE + item.slug} className="item-card">
      <div className="item-card__img">
        <img
          src={require(`../../../assets/img/items/${item.imageCover}`)}
          alt="Фото товара"
          className="item-card__img--item"
        />
      </div>
      <div className="item-card__text">
        <p className="item-card__text--name">{item.name}</p>
        <p className="item-card__text--price">{item.price} руб</p>
      </div>
    </Link>
  );
};

export default ItemCard;
