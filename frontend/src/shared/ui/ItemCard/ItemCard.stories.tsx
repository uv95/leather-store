import { Item, ItemType } from '../../../entities/Item';
import ItemCard from './ItemCard';

export default {
  title: 'shared/ItemCard',
  component: ItemCard,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const item: Item = {
  imageCover: {
    url: 'https://res.cloudinary.com/dz73xvkt7/image/upload/v1752515884/items/item-1752515884361-cover.jpg',
    public_id: '',
  },
  _id: '123456789',
  name: 'Clyde',
  type: ItemType.WALLETS,
  price: '30',
  description:
    'Crafted with intention and quiet elegance, Clyde carries only what matters, resting lightly in the hand or pocket.',
  slug: '',
  images: [],
  createdAt: '',
};

export const Primary = {
  render: () => {
    return (
      <div style={{ width: '20rem' }}>
        <ItemCard item={item} />
      </div>
    );
  },
};
