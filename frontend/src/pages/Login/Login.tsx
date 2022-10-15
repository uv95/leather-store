import React from 'react';
import './login.scss';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../utils/consts';

type Props = {};

const Login = (props: Props) => {
  return (
    <div className="login">
      <div className="login__container">
        <h1 className="login__container__heading">Вход в личный кабинет</h1>
        <form className="login__container__form">
          <div className="login__container__form__box">
            <label
              htmlFor="email"
              className="login__container__form__box-label"
            >
              E-mail
            </label>
            <input
              id="email"
              type="email"
              className="login__container__form__box-input"
              placeholder="E-mail"
            />
          </div>

          <div className="login__container__form__box">
            <label
              htmlFor="password"
              className="login__container__form__box-label"
            >
              Пароль
            </label>
            <input
              id="password"
              type="password"
              className="login__container__form__box-input"
              placeholder="Пароль"
            />
          </div>
          <div className="login__container__form__bottom">
            <Button onClick={() => {}} text="Войти" color="grey" />
            <Link to={''}>Забыли пароль?</Link>
            <Link
              to={REGISTRATION_ROUTE}
              className="login__container__form__bottom-register"
            >
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
