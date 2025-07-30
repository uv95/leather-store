import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { updateCart } from '../../entities/Cart';
import { getUserSelector, Role } from '../../entities/User';
import { getAuthIsLoading, login } from '../../features/auth';
import { useAppDispatch } from '../../hooks';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import { LOCAL_STORAGE_CART } from '../../shared/const/consts';
import toast from '../../shared/lib/toast/toast';
import ButtonRedesigned, { ButtonTheme } from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import './login.scss';

const Login = () => {
  const user = useSelector(getUserSelector);
  const isLoading = useSelector(getAuthIsLoading);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user?.role === Role.ADMIN) {
      navigate('/admin/orders');
    }
  }, [user?.role, navigate]);

  if (user?.role === Role.USER) {
    return <Navigate to="/profile" replace />;
  }

  const { email, password } = formData;

  function loginAsAdmin() {
    dispatch(
      login({
        email: 'admin@gmail.com',
        password: 'adminadmin',
      })
    );
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

        const cart = localStorage.getItem(LOCAL_STORAGE_CART)
          ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_CART)!)
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
              localStorage.removeItem(LOCAL_STORAGE_CART);
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
              <ButtonRedesigned
                className="button-long"
                type="submit"
                disabled={isLoading}
              >
                Login
              </ButtonRedesigned>
              <ButtonRedesigned
                type="button"
                onClick={loginAsAdmin}
                theme={ButtonTheme.BLACK}
                className="button-long"
                disabled={isLoading}
              >
                Login as Admin
              </ButtonRedesigned>
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
