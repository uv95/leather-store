import React from 'react';
import Button from '../../../UI/Button/Button';
import './address.scss';

type Props = {};

const Address = (props: Props) => {
  return (
    <div className="address">
      <div className="address__top">
        <h1 className="address__heading">Адреса доставки</h1>
        <Button onClick={() => {}} text="Добавить адрес" color="black" big />
      </div>
      <div className="address__container">
        <p className="address__container-empty">Список адресов пуст.</p>
      </div>
    </div>
  );
};

export default Address;
