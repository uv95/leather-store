import { Link } from 'react-router-dom';
import { RoutePath } from '../../../../shared/config/routeConfig/routeConfig';
import { useGetAllItems } from '../../../../shared/lib/hooks/useGetAllItems';
import ItemCard from '../../../../shared/ui/ItemCard/ItemCard';
import styles from './ItemsPreview.module.scss';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getItemsLoading } from '../../../../entities/Item';
import ItemsPreviewSkeleton from '../ItemsPreviewSkeleton/ItemsPreviewSkeleton';

const ItemsPreview = () => {
  const { items } = useGetAllItems();
  const loading = useSelector(getItemsLoading);

  return (
    <div className={styles.ItemsPreview}>
      <div className={styles.heading}>
        <h4>Store</h4>
        <Link to={RoutePath.CATALOG} className={styles.link}>
          View all
        </Link>
      </div>
      <div className={styles.items}>
        {loading === 'pending' && <ItemsPreviewSkeleton />}
        {loading === 'succeeded' &&
          items?.slice(0, 4).map((item) => (
            <div key={item._id} className={styles.item}>
              <ItemCard item={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default memo(ItemsPreview);
