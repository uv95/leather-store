import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { getUserSelector } from '../../entities/User';
import { register } from '../../features/auth';
import { updateCart } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../../hooks';
import { RoutePath } from '../../shared/config/routeConfig/routeConfig';
import toast from '../../shared/lib/toast/toast';
import Button from '../../shared/ui/Button/Button';
import Input from '../../shared/ui/Input/Input';
import './register.scss';

const Register = () => {
  const user = useSelector(getUserSelector);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phone: '',
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

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

    dispatch(register(formData))
      .unwrap()
      .then((data) => {
        JSON.parse(localStorage.getItem('cart')!)
          ? dispatch(
              updateCart({
                ...JSON.parse(localStorage.getItem('cart')!),
                user: data.data.user._id,
              })
            )
              .unwrap()
              .then((_) => {
                localStorage.removeItem('cart');
                navigate('/');
              })
          : navigate(-1);
      })
      .catch((error) => toast.error(error));
  };

  return (
    <>
      <div className="register">
        <div className="register__container">
          <h1 className="register__container__heading">Registration</h1>
          <form className="register__container__form" onSubmit={onSubmit}>
            <div className="register__container__form__box">
              <Input
                name="name"
                label="Name"
                type="text"
                value={name}
                onChange={onChange}
                placeholder="Name"
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
                label="Password"
                type="password"
                value={password}
                onChange={onChange}
                placeholder="Password"
                required
              />
            </div>
            <div className="register__container__form__box">
              <Input
                name="passwordConfirm"
                label="Confirm Password"
                type="password"
                value={passwordConfirm}
                onChange={onChange}
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="register__container__form__box">
              <Input
                name="phone"
                label="Phone"
                type="text"
                value={phone}
                onChange={onChange}
                placeholder="Phone"
                required
              />
            </div>
            <div className="register__container__form__bottom">
              <Button type="submit">Register</Button>
              <p>
                Already registered?{' '}
                <Link to={RoutePath.LOGIN} className="redLink">
                  Login
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
