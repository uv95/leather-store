import location from '../../../shared/assets/icons/location.svg';
import logout from '../../../shared/assets/icons/logout.svg';
import orders from '../../../shared/assets/icons/orders.svg';
import portrait from '../../../shared/assets/icons/portrait.svg';

export enum Tab {
  MY_ORDERS = 'My Orders',
  DELIVERY_ADDRESSES = 'Delivery Adresses',
  MY_INFO = 'My Info',
  LOG_OUT = 'Log out',
}

export const tabs = [
  { text: Tab.MY_ORDERS, icon: orders },
  { text: Tab.DELIVERY_ADDRESSES, icon: location },
  { text: Tab.MY_INFO, icon: portrait },
  { text: Tab.LOG_OUT, icon: logout },
];
