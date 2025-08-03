import { analyticsReducer, MonthleRevenue } from '../../../features/analytics';
import { createMockStore } from '../../../shared/config/storybook/createMockStore/createMockStore';
import MonthlyRevenueReport from './MonthlyRevenueReport';
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default {
  title: 'widgets/MonthlyRevenueReport',
  component: MonthlyRevenueReport,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

const mockStore = (monthlyRevenue: MonthleRevenue[]) =>
  createMockStore(
    {
      analytics: {
        monthlyRevenue,
      },
    },
    {
      analytics: analyticsReducer,
    }
  );

const mockReportData: MonthleRevenue[] = [
  {
    _id: {
      year: 2025,
      month: 2,
    },
    totalRevenue: 100,
  },
  {
    _id: {
      year: 2025,
      month: 4,
    },
    totalRevenue: 150,
  },
  {
    _id: {
      year: 2025,
      month: 5,
    },
    totalRevenue: 40,
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
