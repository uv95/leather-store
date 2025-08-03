import { useState } from 'react';
import { Tab } from '../../model/tabs';
import UserSidebar from './UserSidebar';

export default {
  title: 'widgets/UserSidebar',
  component: UserSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

export const Primary = {
  render: () => {
    const [currentTab, setCurrentTab] = useState<Tab>(Tab.MY_ORDERS);

    return (
      <UserSidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
    );
  },
};
