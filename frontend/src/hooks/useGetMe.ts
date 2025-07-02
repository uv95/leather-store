import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getMe } from '../features/user/userSlice';

export function useGetMe() {
  const dispatch = useAppDispatch();
  const { user, isLoading } = useAppSelector((state) => state.user);
  const role = useAppSelector((state) => state.auth.role);

  useEffect(() => {
    role !== '' &&
      dispatch(getMe())
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, role]);

  return { user, isLoading };
}

export default useGetMe;
