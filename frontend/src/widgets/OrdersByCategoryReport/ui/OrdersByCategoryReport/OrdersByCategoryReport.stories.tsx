import { Chart as ChartJS, ArcElement } from 'chart.js';
import { ItemType } from '../../../../entities/Item';
import {
  analyticsReducer,
  OrdersByCategory,
} from '../../../../features/analytics';
import { createMockStore } from '../../../../shared/config/storybook/createMockStore/createMockStore';
import OrdersByCategoryReport from './OrdersByCategoryReport';

ChartJS.register(ArcElement);

export default {
  title: 'widgets/OrdersByCategoryReport',
  component: OrdersByCategoryReport,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const mockStore = (ordersByCategory: OrdersByCategory[]) =>
  createMockStore(
    {
      analytics: {
        ordersByCategory,
      },
    },
    {
      analytics: analyticsReducer,
    }
  );

const mockReportData: OrdersByCategory[] = [
  {
    _id: ItemType.EYEGLASS_CASES,
    totalQuantity: 5,
    totalRevenue: 250,
  },
  {
    _id: ItemType.PASSPORT_COVERS,
    totalQuantity: 8,
    totalRevenue: 320,
  },
  {
    _id: ItemType.WALLETS,
    totalQuantity: 15,
    totalRevenue: 600,
  },
];

export const EmptyReport = {
  args: {
    store: mockStore([]),
  },
};

export const WithData = {
  args: {
    store: mockStore(mockReportData),
  },
};
