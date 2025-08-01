import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from '../../../../shared/lib/toast/toast';
import Button, {
  ButtonSize,
  ButtonTheme,
} from '../../../../shared/ui/Button/Button';
import Input from '../../../../shared/ui/Input/Input';
import './passwordChangeForm.scss';
import { PasswordUpdateData, updatePassword } from '../../../auth';
import { logout } from '../../../../entities/User';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';

const PasswordChangeForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [passwordData, setPasswordData] = useState<PasswordUpdateData>({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const { passwordCurrent, password, passwordConfirm } = passwordData;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(updatePassword(passwordData))
      .unwrap()
      .then(() => {
        dispatch(logout());
        navigate('/login');
      })
      .catch((error) => toast.error(error));
  };

  const onChange = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    setPasswordData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <form className="passwordChangeForm" onSubmit={onSubmit}>
      <>
        <h2 className="passwordChangeForm-title">Password</h2>
        <div className="passwordChangeForm-input">
          <Input
            name="passwordCurrent"
            label="Old password"
            type="password"
            value={passwordCurrent}
            onChange={onChange}
            required
          />
        </div>
        <div className="passwordChangeForm__input-group">
          <div className="passwordChangeForm-input">
            <Input
              name="password"
              label="New password"
              type="password"
              value={password}
              onChange={onChange}
              required
            />
          </div>
          <div className="passwordChangeForm-input">
            <Input
              name="passwordConfirm"
              label="Confirm password"
              type="password"
              value={passwordConfirm}
              onChange={onChange}
              required
            />
          </div>
        </div>
      </>
      <Button type="submit" theme={ButtonTheme.BLACK} size={ButtonSize.L}>
        Save
      </Button>
    </form>
  );
};

export default PasswordChangeForm;
