import { lazy } from 'react';

export enum RoutePath {
  ADMIN_ORDERS = '/admin/orders',
  USER_PROFILE = '/profile',
  ANALYTICS = '/admin/analytics',
  ITEM_PAGE = '/catalog/:slug',
  ITEMS_MANAGEMENT = '/admin/items-management',
  LOGIN = '/login',
  REGISTRATION = '/registration',
  CATALOG = '/catalog',
  CART = '/cart',
  HOME = '/',
  CHECKOUT = '/checkout',
  CHECKOUT_SUCCESSFUL = '/checkout/success',
  CONTACTS = '/contacts',
  LEATHERS = '/leathers',
  NOT_FOUND = '/not_found',
}

const Cart = lazy(() => import('../../../pages/Cart/Cart'));
const Catalog = lazy(() => import('../../../pages/Catalog'));
const Login = lazy(() => import('../../../pages/Login/Login'));
const Register = lazy(() => import('../../../pages/Register/Register'));
const ItemPage = lazy(() => import('../../../pages/ItemPage/ItemPage'));
const Home = lazy(() => import('../../../pages/Home'));
const Checkout = lazy(() => import('../../../pages/Checkout/Checkout'));
const CheckoutSuccessful = lazy(
  () => import('../../../pages/CheckoutSuccessful/CheckoutSuccessful')
);
const NotFound = lazy(() => import('../../../pages/NotFound/NotFound'));
const Contacts = lazy(() => import('../../../pages/Contacts/Contacts'));
const Analytics = lazy(() => import('../../../pages/Analytics/Analytics'));
const ItemsManagement = lazy(
  () =>
    import('../../../pages/ItemsManagement/ui/ItemsManagement/ItemsManagement')
);
const UserProfile = lazy(
  () => import('../../../pages/UserProfile/UserProfile')
);
const Leathers = lazy(() => import('../../../pages/Leathers/Leathers'));
const OrdersAdmin = lazy(
  () => import('../../../pages/OrdersAdmin/ui/OrdersAdmin/OrdersAdmin')
);

interface Routes {
  path: RoutePath;
  Component: React.FC;
}

export const adminRoutes: Routes[] = [
  { path: RoutePath.ADMIN_ORDERS, Component: OrdersAdmin },
  { path: RoutePath.ANALYTICS, Component: Analytics },
  { path: RoutePath.ITEMS_MANAGEMENT, Component: ItemsManagement },
];
export const userRoutes: Routes[] = [
  { path: RoutePath.USER_PROFILE, Component: UserProfile },
  { path: RoutePath.CHECKOUT, Component: Checkout },
  { path: RoutePath.CHECKOUT_SUCCESSFUL, Component: CheckoutSuccessful },
];

export const publicRoutes: Routes[] = [
  { path: RoutePath.CART, Component: Cart },
  {
    path: RoutePath.CATALOG,
    Component: Catalog,
  },
  {
    path: RoutePath.LOGIN,
    Component: Login,
  },
  {
    path: RoutePath.REGISTRATION,
    Component: Register,
  },
  {
    path: RoutePath.ITEM_PAGE,
    Component: ItemPage,
  },
  {
    path: RoutePath.HOME,
    Component: Home,
  },
  {
    path: RoutePath.CONTACTS,
    Component: Contacts,
  },
  {
    path: RoutePath.NOT_FOUND,
    Component: NotFound,
  },
  {
    path: RoutePath.LEATHERS,
    Component: Leathers,
  },
];
