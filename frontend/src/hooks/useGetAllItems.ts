import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getAllItems, selectVisibleItems } from '../features/items/itemsSlice';
import toast from '../shared/lib/toast/toast';

export function useGetAllItems() {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.items);
  const items = useAppSelector(selectVisibleItems);

  useEffect(() => {
    dispatch(getAllItems())
      .unwrap()
      .then()
      .catch((error) => toast.error(error));
  }, [dispatch]);

  return { isLoading, items };
}

export default useGetAllItems;
