import React, { useEffect, useState } from 'react';
import { getRole } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export function useDefineRole() {
  const dispatch = useAppDispatch();
  const [role, setRole] = useState('');
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getRole())
        .unwrap()
        .then((data) => {
          if (localStorage.getItem('user')) setRole(data);
          if (!localStorage.getItem('user')) setRole('');
        });
    }
  }, [dispatch, isLoading]);

  return role;
}
