import location from '../../../shared/assets/icons/location.svg';
import logout from '../../../shared/assets/icons/logout.svg';
import orders from '../../../shared/assets/icons/orders.svg';
import portrait from '../../../shared/assets/icons/portrait.svg';
import analytics from '../../../shared/assets/icons/analytics.svg';
import items from '../../../shared/assets/icons/items.svg';

export enum UserSidebarTab {
  MY_ORDERS = 'My Orders',
  DELIVERY_ADDRESSES = 'Delivery Adresses',
  MY_INFO = 'My Info',
  LOG_OUT = 'Log out',
}

export enum AdminSidebarTab {
  ORDERS = 'Orders',
  ITEMS = 'Items',
  ANALYTICS = 'Analytics',
  HOME = 'Home',
  LOG_OUT = 'Log out',
}

export interface SidebarItem<T> {
  text: T;
  icon: string;
}

export type Tab = AdminSidebarTab | UserSidebarTab;

export const userSidebarItems: SidebarItem<UserSidebarTab>[] = [
  { text: UserSidebarTab.MY_ORDERS, icon: orders },
  { text: UserSidebarTab.DELIVERY_ADDRESSES, icon: location },
  { text: UserSidebarTab.MY_INFO, icon: portrait },
  { text: UserSidebarTab.LOG_OUT, icon: logout },
];

export const adminSidebarItems: SidebarItem<AdminSidebarTab>[] = [
  { text: AdminSidebarTab.ORDERS, icon: orders },
  {
    text: AdminSidebarTab.ITEMS,
    icon: items,
  },
  { text: AdminSidebarTab.ANALYTICS, icon: analytics },
  { text: AdminSidebarTab.LOG_OUT, icon: logout },
];
