import React, { useEffect, useState } from 'react';
import { getRole } from '../features/user/userSlice';
import { setRole } from '../features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

export function useDefineRole() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { role } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getRole())
        .unwrap()
        .then((data) => {
          dispatch(setRole(data));
          console.log(data, 'getRole');
        });
    }
  }, [dispatch, isLoading]);

  return role;
}
