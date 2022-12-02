import React, { useState } from 'react';
import './register.scss';
import Button from '../../components/UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { register } from '../../features/auth/authSlice';
import Input from '../../components/UI/Input/Input';
import Toast from '../../components/UI/Toast/Toast';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  });
  const [openToast, setOpenToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const { name, email, password, passwordConfirm, phone } = formData;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isLoading } = useAppSelector((state) => state.auth);

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(register(formData))
      .unwrap()
      .then(() => navigate('/'))
      .catch((error) => {
        setToastText(error.split(':')[2 || 1]);
        setOpenToast(true);
      });
  };

  if (isLoading) return <h1>Loading....</h1>;

  return (
    <>
      {openToast && (
        <Toast
          text={toastText}
          type="error"
          opened={openToast}
          setOpened={setOpenToast}
        />
      )}
      <div className="register">
        <div className="register__container">
          <h1 className="register__container__heading">Регистрация</h1>
          <form className="register__container__form" onSubmit={onSubmit}>
            <div className="register__container__form__box">
              <Input
                name="name"
                label="Имя"
                type="text"
                value={name}
                onChange={onChange}
                placeholder="Имя"
                required
              />
            </div>
            <div className="register__container__form__box">
              <Input
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="register__container__form__box">
              <Input
                name="password"
                label="Пароль"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="Пароль"
                required
              />
            </div>
            <div className="register__container__form__box">
              <Input
                name="passwordConfirm"
                label="Подтверждение пароля"
                type="password"
                value={passwordConfirm}
                onChange={onChange}
                placeholder="Подтверждение пароля"
                required
              />
            </div>
            <div className="register__container__form__box">
              <Input
                name="phone"
                label="Телефон"
                type="text"
                value={phone}
                onChange={onChange}
                placeholder="Телефон"
                required
              />
            </div>
            <div className="register__container__form__bottom">
              <Button type="submit" text="Зарегистрироваться" color="grey" />
              <p>
                Уже зарегистрированы?{' '}
                <Link to={LOGIN_ROUTE} className="redLink">
                  Войти
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
