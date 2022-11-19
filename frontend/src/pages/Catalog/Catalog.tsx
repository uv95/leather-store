import React, { useState } from 'react';
import './catalog.scss';
import ItemCard from '../../components/UI/ItemCard/ItemCard';
import Filter from '../../components/Catalog/Filter';
// import View from '../../components/Catalog/View';
import { useGetAllItems } from '../../hooks/useGetAllItems';
import FiltersPanel from '../../components/Catalog/FiltersPanel/FiltersPanel';

const Catalog = () => {
  const { isLoading, items } = useGetAllItems();
  const [sort, setSort] = useState('По умолчанию');

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="catalog">
      <div className="catalog__container">
        <div className="catalog__container__top">
          <Filter setSort={setSort} sort={sort} />
          {/* <View /> */}
          <FiltersPanel sort={sort} setSort={setSort} />
        </div>
        <div className="catalog__container__items">
          {sort === 'По умолчанию'
            ? items.map((item) => <ItemCard key={item._id} item={item} />)
            : [...items]
                .sort((a, b) => {
                  if (+a.price === +b.price) return 0;
                  return sort === 'Цена по убыванию'
                    ? +b.price - +a.price
                    : +a.price - +b.price;
                })
                .map((item) => <ItemCard key={item._id} item={item} />)}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
