import React from 'react';
import './catalog.scss';
import ItemCard from '../../components/UI/ItemCard/ItemCard';
import Filter from '../../components/Catalog/Filter';
import View from '../../components/Catalog/View';
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
          {items?.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
