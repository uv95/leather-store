import { Link } from 'react-router-dom';
import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';
import { useGetAllItems } from '../../../shared/lib/hooks/useGetAllItems';
import ItemCard from '../../../shared/ui/ItemCard/ItemCard';
import Skeleton from '../../../shared/ui/Skeleton/Skeleton';
import styles from './ItemsPreview.module.scss';
import { memo } from 'react';

const ItemsPreview = () => {
  const { isLoading, items } = useGetAllItems();

  return (
    <div className={styles.ItemsPreview}>
      <div className={styles.heading}>
        <h4>Store</h4>
        <Link to={RoutePath.CATALOG} className={styles.link}>
          View all
        </Link>
      </div>
      <div className={styles.items}>
        {items?.slice(0, 4).map((item) => (
          <div key={item._id} className={styles.item}>
            {isLoading ? <Skeleton /> : <ItemCard item={item} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(ItemsPreview);
