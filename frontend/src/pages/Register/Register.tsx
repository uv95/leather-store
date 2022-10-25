import React, { useState } from 'react';
import './register.scss';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { register } from '../../features/auth/authSlice';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  });

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
      .catch((error) => console.log(error, 'error'));
  };

  // if (isLoading) return <h1>Loading....</h1>;

  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__container__heading">Регистрация</h1>
        <form className="register__container__form" onSubmit={onSubmit}>
          <div className="register__container__form__box">
            <label
              htmlFor="name"
              className="register__container__form__box-label"
            >
              Имя
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="register__container__form__box-input"
              required
              placeholder="Имя"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="register__container__form__box">
            <label
              htmlFor="email"
              className="register__container__form__box-label"
            >
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="register__container__form__box-input"
              required
              placeholder="E-mail"
              value={email}
              onChange={onChange}
            />
          </div>

          <div className="register__container__form__box">
            <label
              htmlFor="password"
              className="register__container__form__box-label"
            >
              Пароль
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="register__container__form__box-input"
              required
              placeholder="Пароль"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="register__container__form__box">
            <label
              htmlFor="passwordConfirm"
              className="register__container__form__box-label"
            >
              Подтверждение пароля
            </label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              type="password"
              className="register__container__form__box-input"
              required
              placeholder="Подтверждение пароля"
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>
          <div className="register__container__form__box">
            <label
              htmlFor="phone"
              className="register__container__form__box-label"
            >
              Телефон
            </label>
            <input
              id="phone"
              name="phone"
              type="text"
              className="register__container__form__box-input"
              required
              placeholder="Телефон"
              value={phone}
              onChange={onChange}
            />
          </div>
          <div className="register__container__form__bottom">
            <Button type="submit" text="Зарегистрироваться" color="grey" />
            <p>
              Уже зарегистрированы?{' '}
              <Link
                to={LOGIN_ROUTE}
                className="register__container__form__bottom-login"
              >
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
