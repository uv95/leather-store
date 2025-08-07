import { useEffect } from 'react';
import toast from '../toast/toast';
import { useSelector } from 'react-redux';
import { getAllItems, getFilteredItems } from '../../../entities/Item';
import { useAppDispatch } from './useAppDispatch';

export function useGetAllItems() {
  const dispatch = useAppDispatch();
  const items = useSelector(getFilteredItems);

  useEffect(() => {
    if (!items.length) {
      dispatch(getAllItems())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, items.length]);

  return { items };
}

export default useGetAllItems;
