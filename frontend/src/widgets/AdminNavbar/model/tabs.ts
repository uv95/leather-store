import { RoutePath } from '../../../shared/config/routeConfig/routeConfig';

export enum Tab {
  ORDERS = 'Orders',
  ITEMS = 'Items',
  ANALYTICS = 'Analytics',
  HOME = 'Home',
}

export const tabs = [
  { text: Tab.ORDERS, route: RoutePath.ADMIN_ORDERS },
  { text: Tab.ITEMS, route: RoutePath.ITEMS_MANAGEMENT },
  { text: Tab.ANALYTICS, route: RoutePath.ANALYTICS },
  { text: Tab.HOME, route: RoutePath.HOME },
];
