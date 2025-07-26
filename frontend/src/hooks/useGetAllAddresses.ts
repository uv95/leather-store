import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllAddresses } from '../features/address/addressSlice';
import toast from '../shared/lib/toast/toast';

export function useGetAllAddresses() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const { isLoading, addresses } = useAppSelector((state) => state.address);

  useEffect(() => {
    if (user) {
      dispatch(getAllAddresses())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, user]);

  return { isLoading, addresses };
}

export default useGetAllAddresses;
