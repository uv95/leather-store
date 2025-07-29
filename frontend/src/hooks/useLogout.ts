import { logout } from '../entities/User';
import { useAppDispatch } from '../hooks';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    navigate('/');
  };

  return logoutUser;
}

export default useLogout;
