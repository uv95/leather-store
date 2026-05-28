import React from 'react';
import { Link } from 'react-router-dom';
import { RoutePath } from '../../types/routePaths';
import { Item } from '../../../entities/Item';
import styles from './ItemCard.module.scss';

interface ItemCardProps {
  item: Item;
}

const ItemCard: React.FC<ItemCardProps> = React.memo(({ item }) => {
  return (
    <Link
      to={RoutePath.ITEM_PAGE.replace(':slug', item.slug)}
      aria-label={`${item.name}, $${item.price}`}
    >
      <div className={styles.image}>
        <img src={item.imageCover.url} alt={''} />
      </div>
      <div className={styles.info} aria-hidden="true">
        <p className={styles.name}>{item.name}</p>
        <p>${item.price}</p>
      </div>
    </Link>
  );
});

export default ItemCard;
