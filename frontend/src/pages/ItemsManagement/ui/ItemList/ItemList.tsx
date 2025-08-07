import { Item } from '../../../../entities/Item';
import ItemListItem from '../ItemListItem/ItemListItem';
import styles from './ItemList.module.scss';

export const ItemList = ({ items }: { items: Item[] }) => {
  if (!items.length) {
    return <p className={styles.empty}>No items</p>;
  }

  return (
    <>
      {items.map((item) => (
        <ItemListItem key={item._id} item={item} />
      ))}
    </>
  );
};
