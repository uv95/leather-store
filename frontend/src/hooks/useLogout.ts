import React from 'react';
import { useAppDispatch } from '../hooks';
import { logout, setRole } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export function useGetMe() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    dispatch(setRole(''));
    navigate('/');
  };

  return logoutUser;
}

export default useGetMe;
