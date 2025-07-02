import React from 'react';
import './homeItems.scss';
import { Link } from 'react-router-dom';
import { CATALOG_ROUTE } from '../../../utils/consts';
import ItemCard from '../../UI/ItemCard/ItemCard';
import { useGetAllItems } from '../../../hooks/useGetAllItems';
import Spinner from '../../UI/Spinner/Spinner';

const HomeItems = () => {
  const { isLoading, items } = useGetAllItems();

  return (
    <div className="home-items">
      <div className="home-items__heading">
        <h4>Store</h4>
        <Link to={CATALOG_ROUTE} className="home-items__heading-link">
          View all
        </Link>
      </div>
      <div className="home-items__container">
        {isLoading ? (
          <Spinner />
        ) : (
          items
            ?.slice(0, 4)
            .map((item) => <ItemCard key={item._id} item={item} />)
        )}
      </div>
    </div>
  );
};

export default HomeItems;
