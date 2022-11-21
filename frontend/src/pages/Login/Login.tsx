import React, { useState } from 'react';
import './login.scss';
import Button from '../../components/UI/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { REGISTRATION_ROUTE } from '../../utils/consts';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { login } from '../../features/auth/authSlice';
import { getMe } from '../../features/user/userSlice';
import Input from '../../components/UI/Input/Input';
import Toast from '../../components/UI/Toast/Toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [openToast, setOpenToast] = useState(false);
  const [toastText, setToastText] = useState('');

  const { role } = useAppSelector((state) => state.auth);
  const { isLoading } = useAppSelector((state) => state.auth);

  const { email, password } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login(formData))
      .unwrap()
      .then(() =>
        dispatch(getMe())
          .unwrap()
          .then((_) => navigate('/'))
      )
      .catch((error) => {
        setToastText(error);
        setOpenToast(true);
      });
  };

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
      <div className="login">
        <div className="login__container">
          <h1 className="login__container__heading">Вход в личный кабинет</h1>
          <form className="login__container__form" onSubmit={onSubmit}>
            <div className="login__container__form__box">
              <Input
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={onChange}
                placeholder="Email"
              />
            </div>

            <div className="login__container__form__box">
              <Input
                name="password"
                label="Пароль"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="Пароль"
              />
            </div>
            <div className="login__container__form__bottom">
              <Button type="submit" text="Войти" color="grey" />
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
    </>
  );
};

export default Login;
