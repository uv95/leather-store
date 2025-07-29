import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getAddressIsLoading,
  getAllAddresses,
  getAllAddressesSelector,
} from '../entities/Address';
import { getIsLoggedIn } from '../features/auth';
import { useAppDispatch } from '../hooks';
import toast from '../shared/lib/toast/toast';

export function useGetAllAddresses() {
  const dispatch = useAppDispatch();

  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getAddressIsLoading);
  const addresses = useSelector(getAllAddressesSelector);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllAddresses())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, isLoggedIn]);

  return { isLoading, addresses };
}

export default useGetAllAddresses;
