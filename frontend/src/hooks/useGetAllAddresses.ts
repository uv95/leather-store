import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  getAddressIsLoading,
  getAllAddresses,
  getAllAddressesSelector,
} from '../entities/Address';
import { getUserSelector } from '../entities/User';
import { useAppDispatch } from '../hooks';
import toast from '../shared/lib/toast/toast';

export function useGetAllAddresses() {
  const dispatch = useAppDispatch();

  const user = useSelector(getUserSelector);
  const isLoading = useSelector(getAddressIsLoading);
  const addresses = useSelector(getAllAddressesSelector);

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
