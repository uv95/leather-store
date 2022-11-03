import React, { useState, useEffect } from 'react';
import Button from '../../../UI/Button/Button';
import './myInfo.scss';
import { useGetMe } from '../../../../hooks/useGetMe';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../../hooks';
import { updateMe } from '../../../../features/user/userSlice';
import { updatePassword, logout } from '../../../../features/auth/authSlice';
import Input from '../../../UI/Input/Input';

const MyInfo = () => {
  const { user, isLoading } = useGetMe();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const { name, phone, email } = formData;

  const { passwordCurrent, password, passwordConfirm } = passwordData;

  useEffect(() => {
    user &&
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
  }, [user]);

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

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="info">
      <h1 className="info__heading">Мои данные</h1>
      <div className="info__container">
        <form onSubmit={onSubmit}>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Личные данные</h2>
            <div className="flex">
              <div className="info__container__section__input-box">
                <Input
                  name="name"
                  label="Имя"
                  type="text"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="info__container__section__input-box">
                <Input
                  name="phone"
                  label="Телефон"
                  type="text"
                  value={phone}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Email</h2>
            <div className="info__container__section__input-box">
              <Input
                name="email"
                label="Email"
                type="email"
                value={email}
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
              <Input
                name="passwordCurrent"
                label="Старый пароль"
                type="password"
                value={passwordCurrent}
                onChange={onNewPasswordChange}
              />
            </div>
            <div className="flex">
              <div className="info__container__section__input-box">
                <Input
                  name="password"
                  label="Новый пароль"
                  type="password"
                  value={password}
                  onChange={onNewPasswordChange}
                />
              </div>
              <div className="info__container__section__input-box">
                <Input
                  name="passwordConfirm"
                  label="Подтвердите пароль"
                  type="password"
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
