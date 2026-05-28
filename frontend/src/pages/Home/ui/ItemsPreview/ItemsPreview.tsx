import { Link } from 'react-router-dom';
import { RoutePath } from '../../../../shared/types/routePaths';
import { useGetItems } from '../../../../shared/lib/hooks/useGetItems';
import ItemCard from '../../../../shared/ui/ItemCard/ItemCard';
import styles from './ItemsPreview.module.scss';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { getItemsLoading } from '../../../../entities/Item';
import ItemsPreviewSkeleton from '../ItemsPreviewSkeleton/ItemsPreviewSkeleton';

const ItemsPreview = () => {
  const { items } = useGetItems();
  const loading = useSelector(getItemsLoading);

  return (
    <div className={styles.ItemsPreview}>
      <div className={styles.heading}>
        <h3>Store</h3>
        <Link
          to={RoutePath.CATALOG}
          className={styles.link}
          aria-label="View all items in catalog"
        >
          View all
        </Link>
      </div>
      {loading === 'failed' && (
        <p className={styles.error} role="alert">
          Something went wrong. Try reloading the page
        </p>
      )}
      {loading !== 'failed' && (
        <div className={styles.items}>
          {loading === 'pending' && <ItemsPreviewSkeleton />}
          {loading === 'succeeded' &&
            items?.slice(0, 4).map((item) => (
              <div key={item._id} className={styles.item}>
                <ItemCard item={item} />
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default memo(ItemsPreview);
