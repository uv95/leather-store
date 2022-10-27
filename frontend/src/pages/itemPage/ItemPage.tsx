import React from 'react';
import './itemPage.scss';
import Image from '../../components/ItemPage/Image/Image';
import Description from '../../components/ItemPage/Description/Description';
import { useGetItem } from '../../hooks/useGetItem';

const ItemPage = () => {
  const { item, isLoading } = useGetItem();

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="item">
      <div className="item__container">
        <div className="item__container__left">
          {item && <Image item={item} />}
        </div>
        <div className="item__container__right">
          {item && <Description item={item} />}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
