import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllAddresses } from '../features/address/addressSlice';

export function useGetAllAddresses() {
  const dispatch = useAppDispatch();

  const { isLoading, addresses } = useAppSelector((state) => state.address);

  useEffect(() => {
    dispatch(getAllAddresses())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, addresses };
}

export default useGetAllAddresses;
