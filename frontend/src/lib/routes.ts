import { lazy } from 'react';
import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  CATALOG_ROUTE,
  CART_ROUTE,
  ITEM_ROUTE,
  HOME_ROUTE,
  NOT_FOUND_ROUTE,
  CONTACTS_ROUTE,
  ANALYTICS_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  USER_PROFILE_ROUTE,
  LEATHERS_ROUTE,
} from '../utils/consts';

const Cart = lazy(() => import('../pages/Cart/Cart'));
const Catalog = lazy(() => import('../pages/Catalog/Catalog'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const ItemPage = lazy(() => import('../pages/itemPage/ItemPage'));
const Home = lazy(() => import('../pages/Home/Home'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));
const Contacts = lazy(() => import('../pages/Contacts/Contacts'));
const Analytics = lazy(() => import('../components/Admin/Analytics/Analytics'));
const ItemsManagement = lazy(
  () => import('../components/Admin/ItemsManagement/ItemsManagement')
);
const UserProfile = lazy(() => import('../pages/UserProfile/UserProfile'));
const Leathers = lazy(() => import('../pages/Leathers/Leathers'));
const Admin = lazy(() => import('../pages/Admin/Admin'));

interface Routes {
  path: string;
  Component: React.FC;
}

export const adminRoutes: Routes[] = [
  { path: ADMIN_ROUTE, Component: Admin },
  { path: ANALYTICS_ROUTE, Component: Analytics },
  { path: ITEMS_MANAGEMENT_ROUTE, Component: ItemsManagement },
];
export const userRoutes: Routes[] = [
  { path: USER_PROFILE_ROUTE, Component: UserProfile },
];

export const publicRoutes: Routes[] = [
  { path: CART_ROUTE, Component: Cart },
  {
    path: CATALOG_ROUTE,
    Component: Catalog,
  },
  {
    path: LOGIN_ROUTE,
    Component: Login,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Register,
  },
  {
    path: ITEM_ROUTE + ':slug',
    Component: ItemPage,
  },
  {
    path: HOME_ROUTE,
    Component: Home,
  },
  {
    path: CONTACTS_ROUTE,
    Component: Contacts,
  },
  {
    path: NOT_FOUND_ROUTE,
    Component: NotFound,
  },
  {
    path: LEATHERS_ROUTE,
    Component: Leathers,
  },
];
