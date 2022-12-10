export const ADMIN_ROUTE = '/admin';
export const USER_PROFILE_ROUTE = '/profile';
export const STATISTICS_ROUTE = '/admin/statistics';
export const ITEMS_MANAGEMENT_ROUTE = '/admin/items-management';
export const LOGIN_ROUTE = '/login';
export const REGISTRATION_ROUTE = '/registration';
export const CATALOG_ROUTE = '/catalog';
export const CART_ROUTE = '/cart';
export const ITEM_ROUTE = '/catalog/';
// export const ITEM_ROUTE = '/item';
export const HOME_ROUTE = '/';
export const CONTACTS_ROUTE = '/contacts';
export const NOT_FOUND_ROUTE = '/not_found';
export const LEATHERS_ROUTE = '/leathers';

export const statusStyles = [
  { status: 'Ожидает оплаты', style: 'status status-waitsForPayment' },
  { status: 'Принят', style: 'status status-accepted' },
  { status: 'Выполнен', style: 'status status-completed' },
];

export const typeOptions = [
  'Кошельки и картхолдеры',
  'Чехлы для очков',
  'Обложки на паспорт',
];

export const colors = {
  Черный: '#000000',
  Коричневый: '#55391a',
  Синий: '#0846aa',
  Рыжий: '#aa6908',
  Красный: '#cb1212',
  Бордовый: '#801030',
  Зеленый: '#1e8b0d',
  Серый: '#909090',
  // Розовый: '#fe87fe',
  Хаки: '#474c21',
};

// export const BASE_URL = 'https://leather-store.netlify.app/';
export const BASE_URL = 'http://localhost:5000/';
