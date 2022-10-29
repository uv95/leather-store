import React, { useState } from 'react';
import Button from '../../../UI/Button/Button';
import './myInfo.scss';
import { useGetMe } from '../../../../hooks/useGetMe';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { updateMe } from '../../../../features/user/userSlice';
import { updatePassword, logout } from '../../../../features/auth/authSlice';

const MyInfo = () => {
  const { user } = useGetMe();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [formData, setFormData] = useState({
    name: user?.name,
    phone: user?.phone,
    email: user?.email,
  });

  const { passwordCurrent, password, passwordConfirm } = passwordData;

  //first form
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateMe(formData))
      .unwrap()
      .then((data) => console.log(data))
      .catch((error) => console.log(error, 'error'));
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  //second form
  const onNewPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updatePassword(passwordData))
      .unwrap()
      .then((data) => {
        dispatch(logout());
        navigate('/login');
      })
      .catch((error) => console.log(error, 'error'));
  };

  const onNewPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPasswordData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="info">
      <h1 className="info__heading">Мои данные</h1>
      <div className="info__container">
        <form onSubmit={onSubmit}>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Личные данные</h2>
            <div className="flex">
              <div className="info__container__section__input-box">
                <label htmlFor="name">Имя</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user?.name}
                  onChange={onChange}
                />
              </div>
              <div className="info__container__section__input-box">
                <label htmlFor="phone">Телефон</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  defaultValue={user?.phone}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Email</h2>
            <div className="info__container__section__input-box">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                defaultValue={user?.email}
                onChange={onChange}
              />
            </div>
          </div>
          <Button type="submit" text="Сохранить" color="black" big />
        </form>
        <form onSubmit={onNewPasswordSubmit}>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Пароль</h2>
            <div className="info__container__section__input-box">
              <label htmlFor="passwordCurrent">Старый пароль</label>
              <input
                type="password"
                id="passwordCurrent"
                name="passwordCurrent"
                value={passwordCurrent}
                onChange={onNewPasswordChange}
              />
            </div>
            <div className="flex">
              <div className="info__container__section__input-box">
                <label htmlFor="password">Новый пароль</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={onNewPasswordChange}
                />
              </div>
              <div className="info__container__section__input-box">
                <label htmlFor="passwordConfirm">Подтвердите пароль</label>
                <input
                  type="password"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  value={passwordConfirm}
                  onChange={onNewPasswordChange}
                />
              </div>
            </div>
          </div>
          <Button type="submit" text="Сохранить" color="black" big />
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
