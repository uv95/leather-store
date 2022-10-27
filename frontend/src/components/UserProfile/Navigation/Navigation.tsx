import React from 'react';
import Tab from './Tab/Tab';
import logout from '../../../assets/icons/logout.svg';
import portrait from '../../../assets/icons/portrait.svg';
import address from '../../../assets/icons/address.svg';
import orders from '../../../assets/icons/orders.svg';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: (arg: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({
  setCurrentTab,
  currentTab,
}) => {
  const tabs = [
    { text: 'Мои заказы', icon: orders },
    { text: 'Адреса доставки', icon: address },
    { text: 'Мои данные', icon: portrait },
  ];

  return (
    <div className="nav">
      {tabs.map((tab) => (
        <Tab
          key={tab.text}
          text={tab.text}
          onClick={() => setCurrentTab(tab.text)}
          active={currentTab === tab.text}
          icon={tab.icon}
        />
      ))}
      <Tab
        text={'Выйти'}
        onClick={() => setCurrentTab('Выйти')}
        active={currentTab === 'Выйти'}
        icon={logout}
      />
    </div>
  );
};

export default Navigation;
