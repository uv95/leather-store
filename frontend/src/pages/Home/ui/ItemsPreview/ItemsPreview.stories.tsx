import { Item, itemsReducer, ItemType } from '../../../../entities/Item';
import { filterReducer } from '../../../../features/CatalogFilter';
import { createMockStore } from '../../../../shared/config/storybook/createMockStore/createMockStore';
import ItemsPreview from './ItemsPreview';

const items: Item[] = [
  {
    _id: '1234567891',
    name: 'Sungari',
    type: ItemType.PASSPORT_COVERS,
    description:
      'Crafted with intention and quiet elegance, Sungari carries only what matters, resting lightly in the hand or pocket.',
    price: 45,
    imageCover: {
      url: 'https://res.cloudinary.com/dz73xvkt7/image/upload/v1754011849/items/item-1754011848951-cover.jpg',
      public_id: 'items/item-1754011848951-cover',
    },
    images: [],
    createdAt: '2025-07-29T16:06:49.077Z',
    slug: 'sungari',
  },
  {
    _id: '1234567892',
    name: 'Clyde',
    type: ItemType.PASSPORT_COVERS,
    description:
      'Crafted with intention and quiet elegance, Clyde carries only what matters, resting lightly in the hand or pocket.',
    price: 33,
    imageCover: {
      url: 'https://res.cloudinary.com/dz73xvkt7/image/upload/v1752515884/items/item-1752515884361-cover.jpg',
      public_id: 'items/item-1752515884361-cover',
    },
    images: [],
    createdAt: '2025-07-14T16:04:38.762Z',
    slug: 'clyde',
  },
  {
    _id: '1234567893',
    name: 'Elwin',
    type: ItemType.WALLETS,
    description:
      'Elwin is all about ease — soft to the touch, simple in nature, and designed to disappear into your daily rhythm.',
    price: 28,
    imageCover: {
      url: 'https://res.cloudinary.com/dz73xvkt7/image/upload/v1751580279/items/item-1751580279392-cover.jpg',
      public_id: 'items/item-1751580279392-cover',
    },
    images: [],
    createdAt: '2025-07-03T22:01:44.307Z',
    slug: 'elwin',
  },
  {
    _id: '1234567894',
    name: 'Maro',
    type: ItemType.WALLETS,
    description:
      'With a balanced form and subtle texture, Maro brings a calm presence to the way you move through your day.',
    price: 30,
    imageCover: {
      url: 'https://res.cloudinary.com/dz73xvkt7/image/upload/v1751580351/items/item-1751580351503-cover.jpg',
      public_id: 'items/item-1751580351503-cover',
    },
    images: [],
    createdAt: '2025-07-03T22:01:44.307Z',
    slug: 'maro',
  },
];

export default {
  title: 'pages/Home/ItemsPreview',
  component: ItemsPreview,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const mockStore = createMockStore(
  {
    items: {
      items,
    },
    filters: {
      filters: [],
    },
  },
  {
    items: itemsReducer,
    filters: filterReducer,
  }
);

export const Primary = {
  args: {
    store: mockStore,
  },
};
