import { useState } from 'react';
import Sidebar from './Sidebar';
import {
  userSidebarItems,
  UserSidebarTab,
} from '../../../shared/config/sidebar/sidebarItems';

export default {
  title: 'widgets/Sidebar',
  component: Sidebar,
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
    const [currentItem, setCurrentItem] = useState(UserSidebarTab.MY_ORDERS);

    return (
      <Sidebar
        items={userSidebarItems}
        currentItem={currentItem}
        setCurrentItem={setCurrentItem}
      />
    );
  },
};
