import React from 'react';
import './itemPage.scss';
import Image from './image/Image';
import Description from './description/Description';

const ItemPage = () => {
  return (
    <div className="item">
      <div className="item__container">
        <div className="item__container__left">
          <Image />
        </div>
        <div className="item__container__right">
          <Description />
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
