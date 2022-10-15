import React from 'react';
import './register.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../utils/consts';

type Props = {};

const Register = (props: Props) => {
  return (
    <div className="register">
      <div className="register__container">
        <h1 className="register__container__heading">Регистрация</h1>
        <form className="register__container__form">
          <div className="register__container__form__box">
            <label
              htmlFor="name"
              className="register__container__form__box-label"
            >
              Имя
            </label>
            <input
              id="name"
              type="text"
              className="register__container__form__box-input"
              required
              placeholder="Имя"
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
              type="email"
              className="register__container__form__box-input"
              required
              placeholder="E-mail"
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
              type="password"
              className="register__container__form__box-input"
              required
              placeholder="Пароль"
            />
          </div>
          <div className="register__container__form__box">
            <label
              htmlFor="password"
              className="register__container__form__box-label"
            >
              Подтверждение пароля
            </label>
            <input
              id="password"
              type="password"
              className="register__container__form__box-input"
              required
              placeholder="Подтверждение пароля"
            />
          </div>
          <div className="register__container__form__box">
            <label
              htmlFor="phoneNumber"
              className="register__container__form__box-label"
            >
              Телефон
            </label>
            <input
              id="phoneNumber"
              type="text"
              className="register__container__form__box-input"
              required
              placeholder="Телефон"
            />
          </div>
          <div className="register__container__form__bottom">
            <Button onClick={() => {}} text="Зарегистрироваться" color="grey" />
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
