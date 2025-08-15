import { useEffect } from 'react';
import toast from '../toast/toast';
import { useSelector } from 'react-redux';
import { getItems, getFilteredItems } from '../../../entities/Item';
import { useAppDispatch } from './useAppDispatch';

export function useGetItems() {
  const dispatch = useAppDispatch();
  const items = useSelector(getFilteredItems);

  useEffect(() => {
    if (!items.length) {
      dispatch(getItems())
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
    }
  }, [dispatch, items.length]);

  return { items };
}

export default useGetItems;
