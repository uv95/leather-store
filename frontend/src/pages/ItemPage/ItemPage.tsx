import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  getItem,
  getItemBySlug,
  getItemsIsLoading,
  ItemImage,
  ItemInfo,
} from '../../entities/Item';
import Back from '../../shared/ui/Back/Back';
import Spinner from '../../shared/ui/Spinner/Spinner';
import styles from './ItemPage.module.scss';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';

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
        {isLoading && <Spinner />}

        {!item && <p>Item not found!</p>}

        {item && !isLoading && (
          <>
            <div className={styles.itemImage}>
              <ItemImage item={item} />
            </div>
            <div className={styles.itemInfo}>
              <ItemInfo item={item} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ItemPage;
