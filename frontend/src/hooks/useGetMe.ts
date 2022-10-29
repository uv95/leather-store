import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getMe } from '../features/user/userSlice';

export function useGetMe() {
  const dispatch = useAppDispatch();

  const { user, isLoading } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMe())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { user, isLoading };
}

export default useGetMe;
