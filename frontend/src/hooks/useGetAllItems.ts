import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllItems, selectVisibleItems } from '../features/items/itemsSlice';

export function useGetAllItems() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.items);
  const items = useAppSelector(selectVisibleItems);

  useEffect(() => {
    dispatch(getAllItems())
      .unwrap()
      .then()
      .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch]);

  return { isLoading, items };
}

export default useGetAllItems;
