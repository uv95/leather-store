import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Button, { ButtonColor } from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { login } from '../../features/auth/authSlice';
import { updateCart } from '../../features/cart/cartSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { Role } from '../../types/data';
import { REGISTRATION_ROUTE } from '../../utils/consts';
import './login.scss';
import toast from '../../lib/toast';

const Login = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const { email, password } = formData;

  function loginAsAdmin() {
    dispatch(
      login({
        email: 'admin@gmail.com',
        password: 'adminadmin',
      })
    ).then(() => navigate('/admin/orders'));
  }

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
      .then((data) => {
        const { role, _id: userId } = data.data.user;

        if (role === Role.ADMIN) {
          navigate('/admin');
          return;
        }

        const cart = localStorage.getItem('cart')
          ? JSON.parse(localStorage.getItem('cart')!)
          : null;

        if (cart) {
          dispatch(
            updateCart({
              ...cart,
              user: userId,
            })
          )
            .unwrap()
            .then((_) => {
              localStorage.removeItem('cart');
              navigate('/');
            });
        } else {
          navigate('/');
        }
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      <div className="login">
        <div className="login__container">
          <h1 className="login__container__heading">Login to your account</h1>
          <form className="login__container__form" onSubmit={onSubmit}>
            <div className="login__container__form__box">
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

            <div className="login__container__form__box">
              <Input
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="login__container__form__bottom">
              <Button type="submit">Login</Button>
              <Button
                type="button"
                onClick={loginAsAdmin}
                color={ButtonColor.BLACK}
              >
                Login as Admin
              </Button>
              <Link to={''}>Forgot password?</Link>
              <Link to={REGISTRATION_ROUTE} className="redLink">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
