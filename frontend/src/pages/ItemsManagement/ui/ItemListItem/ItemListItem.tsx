import { memo, useMemo } from 'react';
import { Item } from '../../../../entities/Item';
import ListItemLayout from '../../../../shared/ui/ListItemLayout/ListItemLayout';
import { ItemDetails } from '../../../../widgets/ItemDetails';
import './itemListItem.scss';

type ItemListItemProps = {
  item: Item;
};

const ItemListItem = ({ item }: ItemListItemProps) => {
  const { imageCover, _id: itemId, name, type, price } = item;

  const itemData: Record<string, string> = useMemo(
    () => ({
      imageCover: imageCover.url,
      itemId: `ID: ${itemId.slice(0, 8)}`,
      name,
      type: type.split('')[0].toUpperCase() + type.slice(1),
      price: `$${price}`,
    }),
    [imageCover.url, itemId, name, type, price]
  );

  return (
    <ListItemLayout Details={<ItemDetails item={item} />}>
      <div
        className="itemListItem ItemListItem-withImage"
        style={{
          gridTemplateColumns: `repeat(${Object.keys(itemData).length}, 1fr)`,
        }}
      >
        {Object.keys(itemData).map((dataKey) => (
          <div key={dataKey} className={`itemListItem__field`}>
            <div className="itemListItem__field-content">
              {dataKey === 'imageCover' ? (
                <img src={itemData.imageCover} alt="Product" />
              ) : (
                itemData[dataKey]
              )}
            </div>
          </div>
        ))}
      </div>
    </ListItemLayout>
  );
};

export default memo(ItemListItem);
