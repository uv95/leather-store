export const ADMIN_ROUTE = '/admin';
export const USER_PROFILE_ROUTE = '/profile';
export const STATISTICS_ROUTE = '/admin/statistics';
export const ITEMS_MANAGEMENT_ROUTE = '/admin/items-management';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const CATALOG_ROUTE = '/catalog';
export const CART_ROUTE = '/cart';
export const ITEM_ROUTE = '/catalog/';
export const HOME_ROUTE = '/';
export const CONTACTS_ROUTE = '/contacts';
export const NOT_FOUND_ROUTE = '/not_found';
export const LEATHERS_ROUTE = '/leathers';

export const statusStyles = [
  { status: 'Awaiting payment', style: 'status status-waitsForPayment' },
  { status: 'Accepted', style: 'status status-accepted' },
  { status: 'Completed', style: 'status status-completed' },
];

export enum ITEM_TYPE {
  WALLETS = 'Wallets and cardholders',
  EYEGLASS_CASES = 'Eyeglass cases',
  PASSPORT_COVERS = 'Passport covers',
}

export const colors = {
  Black: '#000000',
  Brown: '#55391a',
  Blue: '#0846aa',
  Ginger: '#aa6908',
  Red: '#cb1212',
  Burgundy: '#801030',
  Green: '#1e8b0d',
  Grey: '#909090',
  Khaki: '#474c21',
};

// export const BASE_URL =
//   process.env.NODE_ENV === 'development'
//     ? 'http://localhost:5000/'
//     : 'https://leather-store-server.onrender.com/';

export const BASE_URL = 'https://leather-store.fly.dev/';
