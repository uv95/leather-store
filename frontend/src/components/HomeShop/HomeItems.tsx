import React from 'react';
import './homeItems.scss';
import { Link } from 'react-router-dom';
import { CATALOG_ROUTE } from '../../utils/consts';
import ItemCard from '../ItemCard/ItemCard';
import wallet1 from '../../assets/img/wallet-1.jpg';
import wallet2 from '../../assets/img/wallet-2.jpg';
import wallet3 from '../../assets/img/wallet-3.jpg';

type Props = {};

const HomeItems = (props: Props) => {
  return (
    <div className="home-items">
      <div className="home-items__heading">
        <h4>Магазин</h4>
        <Link to={CATALOG_ROUTE} className="home-items__heading-link">
          Смотреть все
        </Link>
      </div>
      <div className="home-items__container">
        <ItemCard img={wallet1} />
        <ItemCard img={wallet2} />
        <ItemCard img={wallet3} />
      </div>
    </div>
  );
};

export default HomeItems;
