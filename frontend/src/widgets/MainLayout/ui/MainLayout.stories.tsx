import { orderReducer } from '../../../entities/Order';
import { Role, User, userReducer } from '../../../entities/User';
import { createMockStore } from '../../../shared/config/storybook/createMockStore/createMockStore';
import MainLayout from './MainLayout';

const store = (user: Partial<User> | undefined) =>
  createMockStore(
    {
      user: {
        user,
      },
      orders: {
        myOrders: [],
      },
    },
    {
      user: userReducer,
      orders: orderReducer,
    }
  );

export default {
  title: 'widgets/MainLayout',
  component: MainLayout,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const AdminLayout = {
  args: { path: '/admin/analytics', store: store({ role: Role.ADMIN }) },
};

export const UserLayout = {
  args: { store: store({ role: Role.USER }) },
};

export const GuestUserLayout = {
  args: { store: store(undefined) },
};
