import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserSelector, updateUser } from '../../../../entities/User';
import toast from '../../../../shared/lib/toast/toast';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import './personalInfoForm.scss';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';

const PersonalInfoForm = () => {
  const user = useSelector(getUserSelector);
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });
  const { name, phone, email } = formData;

  useEffect(() => {
    user &&
      setFormData({
        name: user.name,
        phone: user.phone,
        email: user.email,
      });
  }, [user]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updateUser({ dto: formData }))
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

  return (
    <form className="personalInfoForm" onSubmit={onSubmit}>
      <h2 className="personalInfoForm-title">Personal Info</h2>
      <div className="personalInfoForm__input-group">
        <div className="personalInfoForm-input">
          <Input
            name="name"
            label="Name"
            type="text"
            value={name}
            onChange={onChange}
          />
        </div>
        <div className="personalInfoForm-input">
          <Input
            name="phone"
            label="Phone"
            type="text"
            value={phone}
            onChange={onChange}
          />
        </div>
      </div>

      <h2 className="personalInfoForm-title">Email</h2>
      <div className="personalInfoForm-input">
        <Input
          name="email"
          label="Email"
          type="email"
          value={email}
          onChange={onChange}
        />
      </div>

      <Button type="submit" theme={ButtonTheme.BLACK} size={ButtonSize.L}>
        Save
      </Button>
    </form>
  );
};

export default PersonalInfoForm;
