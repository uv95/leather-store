import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getItem,
  getItemBySlug,
  getItemsIsLoading,
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
  const isLoading = useSelector(getItemsIsLoading);

  useEffect(() => {
    if (slug) {
      dispatch(getItemBySlug(slug));
    }
  }, [dispatch, slug]);

  return (
    <div className={styles.Item}>
      <Back />
      <div className={styles.container}>
        {!item && !isLoading && <p>Item not found!</p>}

        {!isLoading && item ? (
          <div className={styles.itemImage}>
            <ItemImage item={item} />
          </div>
        ) : (
          <div className={styles.imageSkeletonContainer}>
            <Skeleton className={styles.imageSkeleton} />
          </div>
        )}

        <div className={styles.itemInfo}>
          {!isLoading && item ? <ItemInfo item={item} /> : <ItemInfoSkeleton />}
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
