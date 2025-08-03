import { ItemType } from '../../../entities/Item';
import ItemListItem from './ItemListItem';

export default {
  title: 'widgets/ItemListItem',
  component: ItemListItem,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  args: {
    item: {
      imageCover: {
        url: 'https://res.cloudinary.com/dz73xvkt7/image/upload/v1752515884/items/item-1752515884361-cover.jpg',
      },
      _id: '123456789',
      name: 'Clyde',
      type: ItemType.WALLETS,
      price: 30,
      description:
        'Crafted with intention and quiet elegance, Clyde carries only what matters, resting lightly in the hand or pocket.',
    },
  },
};
