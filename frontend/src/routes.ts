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
  STATISTICS_ROUTE,
  ITEMS_MANAGEMENT_ROUTE,
  USER_PROFILE_ROUTE,
  LEATHERS_ROUTE,
} from './utils/consts';
import Admin from './pages/Admin/Admin';
import Cart from './pages/Cart/Cart';
import Catalog from './pages/Catalog/Catalog';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ItemPage from './pages/itemPage/ItemPage';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';
import Contacts from './pages/Contacts/Contacts';
import Statistics from './components/Admin/Statistics/Statistics';
import ItemsManagement from './components/Admin/ItemsManagement/ItemsManagement';
import UserProfile from './pages/UserProfile/UserProfile';
import Leathers from './pages/Leathers/Leathers';

interface Routes {
  path: string;
  Component: React.FC;
}

export const authRoutes: Routes[] = [
  { path: ADMIN_ROUTE, Component: Admin },
  { path: USER_PROFILE_ROUTE, Component: UserProfile },
  { path: STATISTICS_ROUTE, Component: Statistics },
  { path: ITEMS_MANAGEMENT_ROUTE, Component: ItemsManagement },
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
