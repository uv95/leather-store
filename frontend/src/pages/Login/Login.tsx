import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { mergeCartItems } from '../../entities/Cart';
import { getUserSelector, Role } from '../../entities/User';
import { getAuthLoading, login } from '../../features/auth';
import LoginAsAdminButton from '../../features/LoginAsAdminButton/LoginAsAdminButton';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import { LOCAL_STORAGE_CART } from '../../shared/const/consts';
import toast from '../../shared/lib/toast/toast';
import AuthorizationForm from '../../shared/ui/AuthorizationForm/AuthorizationForm';
import Button from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import styles from './Login.module.scss';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const loading = useSelector(getAuthLoading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    if (user?.role === Role.ADMIN) {
      navigate('/admin/orders');
    }
  }, [user?.role, navigate]);

  if (user?.role === Role.USER) {
    return <Navigate to="/profile" replace />;
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
        const { role } = data.data;

        if (role === Role.ADMIN) {
          navigate('/admin');
          return;
        }

        const cartItemsStringified = localStorage.getItem(LOCAL_STORAGE_CART);
        const cartItems = cartItemsStringified
          ? JSON.parse(cartItemsStringified)
          : [];

        if (cartItems.length) {
          dispatch(
            mergeCartItems({
              dto: cartItems,
              navigate,
            })
          );
        } else {
          navigate(-1);
        }
      })
      .catch((error: string) => toast.error(error));
  };

  return (
    <AuthorizationForm onSubmit={onSubmit} title="Login to your account">
      <Input
        name="email"
        label="Email"
        type="email"
        value={formData.email}
        onChange={onChange}
        placeholder="Email"
        required
      />

      <Input
        name="password"
        label="Password"
        type="password"
        value={formData.password}
        onChange={onChange}
        placeholder="Password"
        required
      />

      <div className={styles.buttons}>
        <Button
          className="button-long"
          type="submit"
          disabled={loading === 'pending'}
        >
          Login
        </Button>

        <LoginAsAdminButton />

        {/* <Link to={''}>Forgot password?</Link> */}
        <p>
          Don't have an account?{' '}
          <Link to={RoutePath.REGISTRATION} className="redLink">
            Register
          </Link>
        </p>
      </div>
    </AuthorizationForm>
  );
};

export default Login;
