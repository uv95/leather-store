import React, { useState } from 'react';
import Tab from './Tab/Tab';
import logoutsvg from '../../../assets/icons/logout.svg';
import portrait from '../../../assets/icons/portrait.svg';
import address from '../../../assets/icons/address.svg';
import orders from '../../../assets/icons/orders.svg';
import useLogout from '../../../hooks/useLogout';
import Modal from '../../UI/Modal/Modal';
import Button from '../../UI/Button/Button';

interface NavigationProps {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}

const Navigation: React.FC<NavigationProps> = ({
  setCurrentTab,
  currentTab,
}) => {
  const logoutUser = useLogout();
  const [openModal, setOpenModal] = useState(false);

  const tabs = [
    { text: 'Мои заказы', icon: orders },
    { text: 'Адреса доставки', icon: address },
    { text: 'Мои данные', icon: portrait },
  ];

  return (
    <>
      {openModal && (
        <Modal
          setOpen={setOpenModal}
          Content={
            <div className="myOrderDetails__modal">
              <p>Вы действительно хотите выйти?</p>
              <div className="myOrderDetails__modal__buttons">
                <Button
                  text="Да"
                  color="grey"
                  onClick={() => {
                    logoutUser();
                    setOpenModal(false);
                  }}
                />
                <Button
                  text="Нет"
                  color="grey"
                  onClick={() => setOpenModal(false)}
                />
              </div>
            </div>
          }
        />
      )}
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
          onClick={() => setOpenModal(true)}
          active={currentTab === 'Выйти'}
          icon={logoutsvg}
        />
      </div>
    </>
  );
};

export default Navigation;
