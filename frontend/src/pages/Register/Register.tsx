import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { mergeCartItems } from '../../entities/Cart';
import { getUserSelector } from '../../entities/User';
import { getAuthLoading, signup } from '../../features/auth';
import { RoutePath } from '../../shared/types/routePaths';
import { LOCAL_STORAGE_CART } from '../../shared/const/consts';
import toast from '../../shared/lib/toast/toast';
import Input from '../../shared/ui/Input/Input';
import styles from './Register.module.scss';
import Button from '../../shared/ui/Button/Button';
import AuthorizationForm from '../../shared/ui/AuthorizationForm/AuthorizationForm';
import { useAppDispatch } from '../../shared/lib/hooks/useAppDispatch';

const Register = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(getUserSelector);
  const loading = useSelector(getAuthLoading);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  });

  if (user) {
    return <Navigate to="/profile" replace />;
  }

  const { name, email, password, passwordConfirm, phone } = formData;

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(signup(formData))
      .unwrap()
      .then((data) => {
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
      .catch((error) => toast.error(error));
  };

  return (
    <AuthorizationForm onSubmit={onSubmit} title="Registration">
      <Input
        name="name"
        label="Name"
        type="text"
        value={name}
        onChange={onChange}
        placeholder="Name"
        required
      />

      <Input
        name="email"
        label="Email"
        type="email"
        value={email}
        onChange={onChange}
        placeholder="Email"
        required
      />

      <Input
        name="password"
        label="Password"
        type="password"
        value={password}
        onChange={onChange}
        placeholder="Password"
        required
      />

      <Input
        name="passwordConfirm"
        label="Confirm Password"
        type="password"
        value={passwordConfirm}
        onChange={onChange}
        placeholder="Confirm Password"
        required
      />

      <Input
        name="phone"
        label="Phone"
        type="text"
        value={phone}
        onChange={onChange}
        placeholder="Phone"
        required
      />

      <div className={styles.buttons}>
        <Button type="submit" disabled={loading === 'pending'}>
          Register
        </Button>
        <p>
          Already registered?{' '}
          <Link to={RoutePath.LOGIN} className="redLink">
            Login
          </Link>
        </p>
      </div>
    </AuthorizationForm>
  );
};

export default Register;
