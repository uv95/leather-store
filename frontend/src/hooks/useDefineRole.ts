import React, { useEffect, useState } from 'react';
import { getRole } from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export function useDefineRole() {
  const dispatch = useAppDispatch();
  const [role, setRole] = useState('');
  const { isLoading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    !isLoading &&
      dispatch(getRole())
        .unwrap()
        .then((data) => {
          setRole(data);
        });
  }, [dispatch, isLoading]);

  return role;
}
