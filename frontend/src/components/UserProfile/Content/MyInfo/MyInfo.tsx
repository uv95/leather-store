import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout, updatePassword } from '../../../../features/auth/authSlice';
import { updateMe } from '../../../../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import toast from '../../../../lib/toast';
import Button, { ButtonColor, ButtonSize } from '../../../UI/Button/Button';
import Input from '../../../UI/Input/Input';
import './myInfo.scss';

const MyInfo = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const { name, phone, email } = formData;

  const { passwordCurrent, password, passwordConfirm } = passwordData;

  useEffect(() => {
    user &&
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
  }, [user]);

  //first form
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateMe(formData))
      .unwrap()
      .then(() => toast.success('Personal info updated'))
      .catch((error) => toast.error(error));
  };

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  //second form
  const onNewPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updatePassword(passwordData))
      .unwrap()
      .then(() => {
        toast.success('Password updated');
        dispatch(logout());
        navigate('/login');
      })
      .catch((error) => toast.error(error));
  };

  const onNewPasswordChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPasswordData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <div className="info">
      <h1 className="info__heading">My Info</h1>
      <div className="info__container">
        <form onSubmit={onSubmit}>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Personal Info</h2>
            <div className="flex">
              <div className="info__container__section__input-box">
                <Input
                  name="name"
                  label="Name"
                  type="text"
                  value={name}
                  onChange={onChange}
                />
              </div>
              <div className="info__container__section__input-box">
                <Input
                  name="phone"
                  label="Phone"
                  type="text"
                  value={phone}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Email</h2>
            <div className="info__container__section__input-box">
              <Input
                name="email"
                label="Email"
                type="email"
                value={email}
                onChange={onChange}
              />
            </div>
          </div>
          <Button type="submit" color={ButtonColor.BLACK} size={ButtonSize.L}>
            Save
          </Button>
        </form>
        <form onSubmit={onNewPasswordSubmit}>
          <div className="info__container__section">
            <h2 className="info__container__section-heading">Password</h2>
            <div className="info__container__section__input-box">
              <Input
                name="passwordCurrent"
                label="Old password"
                type="password"
                value={passwordCurrent}
                onChange={onNewPasswordChange}
              />
            </div>
            <div className="flex">
              <div className="info__container__section__input-box">
                <Input
                  name="password"
                  label="New password"
                  type="password"
                  value={password}
                  onChange={onNewPasswordChange}
                />
              </div>
              <div className="info__container__section__input-box">
                <Input
                  name="passwordConfirm"
                  label="Confirm password"
                  type="password"
                  value={passwordConfirm}
                  onChange={onNewPasswordChange}
                />
              </div>
            </div>
          </div>
          <Button type="submit" color={ButtonColor.BLACK} size={ButtonSize.L}>
            Save
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MyInfo;
