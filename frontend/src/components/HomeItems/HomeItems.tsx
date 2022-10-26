import React from 'react';
import './homeItems.scss';
import { Link } from 'react-router-dom';
import { CATALOG_ROUTE } from '../../utils/consts';
import ItemCard from '../ItemCard/ItemCard';
import { useGetAllItems } from '../../hooks/useGetAllItems';

const HomeItems = () => {
  const { isLoading, items } = useGetAllItems();

  if (isLoading) return <h1>LOADING</h1>;

  return (
    <div className="home-items">
      <div className="home-items__heading">
        <h4>Магазин</h4>
        <Link to={CATALOG_ROUTE} className="home-items__heading-link">
          Смотреть все
        </Link>
      </div>
      <div className="home-items__container">
        {items?.map((item) => (
          <ItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default HomeItems;
