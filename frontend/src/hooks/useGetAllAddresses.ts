import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import toast from '../shared/lib/toast/toast';
import { useSelector } from 'react-redux';
import {
  getAddressIsLoading,
  getAllAddresses,
  getAllAddressesSelector,
} from '../entities/Address';

export function useGetAllAddresses() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
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
