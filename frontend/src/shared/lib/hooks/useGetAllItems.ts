import { useEffect } from 'react';
import toast from '../toast/toast';
import { useSelector } from 'react-redux';
import {
  getAllItems,
  getFilteredItems,
  getItemsIsLoading,
} from '../../../entities/Item';
import { useAppDispatch } from './useAppDispatch';

export function useGetAllItems() {
  const dispatch = useAppDispatch();
  const isLoading = useSelector(getItemsIsLoading);
  const items = useSelector(getFilteredItems);

  useEffect(() => {
    dispatch(getAllItems())
      .unwrap()
      .then()
      .catch((error) => toast.error(error));
  }, [dispatch]);

  return { isLoading, items };
}

export default useGetAllItems;
