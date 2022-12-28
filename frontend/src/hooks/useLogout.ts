import { useAppDispatch } from '../hooks';
import { logout, setRole } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    dispatch(setRole(''));
    navigate('/');
  };

  return logoutUser;
}

export default useLogout;
