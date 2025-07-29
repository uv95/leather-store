import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getUserSelector, Role } from '../../entities/User';
import { login } from '../../features/auth';
import { updateCart } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../hooks';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import toast from '../../shared/lib/toast/toast';
import Button, { ButtonColor } from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import './login.scss';
import { LOCAL_STORAGE_USER_KEY } from '../../shared/const/consts';

const Login = () => {
  const user = useSelector(getUserSelector);
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
    ).then(() => {
      navigate('/admin/orders');
    });
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
      .then((data: any) => {
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
      .catch((error: string) => toast.error(error));
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
              <Link to={RoutePath.REGISTRATION} className="redLink">
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
