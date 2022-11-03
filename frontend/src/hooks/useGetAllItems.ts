import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllItems } from '../features/items/itemsSlice';

export function useGetAllItems() {
  const dispatch = useAppDispatch();

  const { isLoading, items } = useAppSelector((state) => state.items);

  useEffect(() => {
    dispatch(getAllItems())
      .unwrap()
      .then((data) => console.log(data, 'getallitems'))
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, items };
}

export default useGetAllItems;
