import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getItemsIsLoading, Item } from '../../../../entities/Item';
import { getSortBy, SortingOptions } from '../../../../features/CatalogFilter';
import ItemCard from '../../../../shared/ui/ItemCard/ItemCard';
import styles from './CatalogItemList.module.scss';
import Skeleton from '../../../../shared/ui/Skeleton/Skeleton';

function CatalogItemList(props: {
  items: Item[];
  itemsPerPage: number;
  currentPage: number;
}) {
  const sortBy = useSelector(getSortBy);
  const isLoading = useSelector(getItemsIsLoading);
  const { items, itemsPerPage, currentPage } = props;

  const itemsOnPage = useMemo(
    () =>
      items.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage),
    [itemsPerPage, currentPage, items]
  );

  const sortedItems = useMemo(() => {
    if (sortBy === SortingOptions.DEFAULT) {
      return itemsOnPage;
    }

    return [...itemsOnPage].sort((a, b) => {
      if (+a.price === +b.price) return 0;

      return sortBy === SortingOptions.PRICE_DESCENDING
        ? +b.price - +a.price
        : +a.price - +b.price;
    });
  }, [sortBy, itemsOnPage]);

  if (!isLoading && !items.length) {
    return <p className={styles.empty}>No items found</p>;
  }

  return (
    <div className={styles.CatalogItemList}>
      {isLoading &&
        [...Array(itemsPerPage)].map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <Skeleton className={styles.imageSekeleton} />
            <Skeleton height={1.8} />
          </div>
        ))}

      {!isLoading &&
        sortedItems.map((item) => <ItemCard key={item._id} item={item} />)}
    </div>
  );
}

export default CatalogItemList;
