import React from 'react';
import Button from '../../../UI/Button/Button';
import './myInfo.scss';

type Props = {};

const MyInfo = (props: Props) => {
  return (
    <div className="info">
      <h1 className="info__heading">Мои данные</h1>
      <div className="info__container">
        <div className="info__container__section">
          <h2 className="info__container__section-heading">Личные данные</h2>
          <div className="flex">
            <div className="info__container__section__input-box">
              <label htmlFor="name">Имя</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="info__container__section__input-box">
              <label htmlFor="phone">Телефон</label>
              <input type="text" id="phone" name="phone" />
            </div>
          </div>
        </div>
        <div className="info__container__section">
          <h2 className="info__container__section-heading">Email</h2>
          <div className="info__container__section__input-box">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" />
          </div>
        </div>
        <div className="info__container__section">
          <h2 className="info__container__section-heading">Пароль</h2>
          <div className="flex">
            <div className="info__container__section__input-box">
              <label htmlFor="password">Новый пароль</label>
              <input type="password" id="password" name="password" />
            </div>
            <div className="info__container__section__input-box">
              <label htmlFor="passwordConfirm">Подтвердите новый пароль</label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
              />
            </div>
          </div>
        </div>
        <Button onClick={() => {}} text="Сохранить" color="black" big />
      </div>
    </div>
  );
};

export default MyInfo;
