import { ItemType } from '../../../../entities/Item';

export interface MonthleRevenue {
  totalRevenue: number;
  _id: {
    year: number;
    month: number;
  };
}

export interface OrdersByCategory {
  _id: ItemType;
  totalQuantity: number;
  totalRevenue: number;
}

export interface AnalyticsSchema {
  monthlyRevenue: MonthleRevenue[];
  ordersByCategory: OrdersByCategory[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}
