import React from 'react';
import './itemCard.scss';

interface ItemCardProps {
  img: string;
}

const ItemCard: React.FC<ItemCardProps> = ({ img }) => {
  return (
    <div className="item-card">
      <div className="item-card__img">
        <img src={img} alt="" className="item-card__img--item" />
      </div>
      <div className="item-card__text">
        <p className="item-card__text--name">Кожаный кошелек</p>
        <p className="item-card__text--price">1000 руб</p>
      </div>
    </div>
  );
};

export default ItemCard;
