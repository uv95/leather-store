import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getItem,
  getItemBySlug,
  getItemsLoading,
  ItemImage,
  ItemInfo,
  ItemInfoSkeleton,
} from '../../entities/Item';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import Back from '../../shared/ui/Back/Back';
import Skeleton from '../../shared/ui/Skeleton/Skeleton';
import styles from './ItemPage.module.scss';

const ItemPage = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams();
  const item = useSelector(getItem);
  const loading = useSelector(getItemsLoading);

  useEffect(() => {
    if (slug) {
      dispatch(getItemBySlug({ slug }));
    }
  }, [dispatch, slug]);

  return (
    <div className={styles.Item}>
      <Back />
      <div className={styles.container}>
        {!item && loading === 'succeeded' && <p>Item not found!</p>}

        {loading === 'succeeded' && item && (
          <div className={styles.itemImage}>
            <ItemImage item={item} />
          </div>
        )}
        {loading === 'pending' && (
          <div className={styles.imageSkeletonContainer}>
            <Skeleton className={styles.imageSkeleton} />
          </div>
        )}

        <div className={styles.itemInfo}>
          {loading === 'pending' && <ItemInfoSkeleton />}
          {loading === 'succeeded' && item && <ItemInfo item={item} />}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
