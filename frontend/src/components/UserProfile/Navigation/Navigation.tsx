import React from 'react';
import Tab from './Tab/Tab';
import logoutsvg from '../../../assets/icons/logout.svg';
import portrait from '../../../assets/icons/portrait.svg';
import address from '../../../assets/icons/address.svg';
import orders from '../../../assets/icons/orders.svg';
import useLogout from '../../../hooks/useLogout';
import { useAppDispatch } from '../../../hooks';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({
  setCurrentTab,
  currentTab,
}) => {
  const dispatch = useAppDispatch();
  const logoutUser = useLogout();

  const tabs = [
    { text: 'Мои заказы', icon: orders },
    { text: 'Адреса доставки', icon: address },
    { text: 'Мои данные', icon: portrait },
  ];

  return (
    <div className="nav">
      {tabs.map((tab, i) => (
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
        onClick={logoutUser}
        active={currentTab === 'Выйти'}
        icon={logoutsvg}
      />
    </div>
  );
};

export default Navigation;
