import { memo } from 'react';
import { Item } from '../../../../entities/Item';
import ListItemLayout from '../../../../shared/ui/ListItemLayout/ListItemLayout';
import ItemDetails from '../ItemDetails/ItemDetails';
import './itemListItem.scss';

type ItemListItemProps = {
  item: Item;
};

const ItemListItem = ({ item }: ItemListItemProps) => {
  const { imageCover, _id: itemId, name, type, price } = item;

  return (
    <ListItemLayout Details={<ItemDetails item={item} />}>
      <dl
        className="itemListItem ItemListItem-withImage"
        style={{
          gridTemplateColumns: `repeat(5, 1fr)`,
        }}
      >
        <div className="itemListItem__field">
          <dt className="sr-only">Image cover</dt>
          <dd className="itemListItem__field-content">
            <img src={imageCover.url} alt={`${name} product`} />
          </dd>
        </div>
        <div className="itemListItem__field">
          <dt className="sr-only">Item id</dt>
          <dd className="itemListItem__field-content">{`ID: ${itemId.slice(0, 8)}`}</dd>
        </div>
        <div className="itemListItem__field">
          <dt className="sr-only">Item name</dt>
          <dd className="itemListItem__field-content">{name}</dd>
        </div>
        <div className="itemListItem__field">
          <dt className="sr-only">Item type</dt>
          <dd className="itemListItem__field-content">
            {type.split('')[0].toUpperCase() + type.slice(1)}
          </dd>
        </div>
        <div className="itemListItem__field">
          <dt className="sr-only">Item price</dt>
          <dd className="itemListItem__field-content">{`$${price}`}</dd>
        </div>
      </dl>
    </ListItemLayout>
  );
};

export default memo(ItemListItem);
