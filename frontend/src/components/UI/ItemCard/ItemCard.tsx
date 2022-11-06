import React from 'react';
import './itemCard.scss';
import { IItem } from '../../../types/data';
import { Link } from 'react-router-dom';
import { ITEM_ROUTE } from '../../../utils/consts';

interface ItemCardProps {
  item: IItem;
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
