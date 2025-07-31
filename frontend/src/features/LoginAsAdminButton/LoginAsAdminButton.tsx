import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../hooks';
import Button, { ButtonTheme } from '../../shared/ui/Button/Button';
import { getAuthIsLoading, login } from '../auth';

const LoginAsAdminButton = () => {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getAuthIsLoading);

  function loginAsAdmin() {
    dispatch(
      login({
        email: 'admin@gmail.com',
        password: 'adminadmin',
      })
    );
  }

  return (
    <Button
      onClick={loginAsAdmin}
      theme={ButtonTheme.BLACK}
      className="button-long"
      disabled={isLoading}
    >
      Login as Admin
    </Button>
  );
};

export default LoginAsAdminButton;
