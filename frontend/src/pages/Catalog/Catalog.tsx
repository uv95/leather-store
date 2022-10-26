import React from 'react';
import './catalog.scss';
import ItemCard from '../../components/ItemCard/ItemCard';
import wallet1 from '../../assets/img/wallet-1.jpg';
import wallet2 from '../../assets/img/wallet-2.jpg';
import wallet3 from '../../assets/img/wallet-3.jpg';
import Filter from './top-bar/Filter';
import View from './top-bar/View';
import { useGetAllItems } from '../../hooks/useGetAllItems';

const Catalog = () => {
  const { isLoading, items } = useGetAllItems();

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__container__top">
          <Filter />
          <View />
        </div>
        <div className="catalog__container__items">
          {items.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
