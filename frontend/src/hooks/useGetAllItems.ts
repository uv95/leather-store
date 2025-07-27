import { useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import toast from '../shared/lib/toast/toast';
import { useSelector } from 'react-redux';
import { getItemsIsLoading } from '../entities/Item/model/selectors/getItemsIsLoading/getItemsIsLoading';
import { getAllItems } from '../entities/Item/model/services/getAllItems/getAllItems';
import { getFilteredItems } from '../entities/Item/model/selectors/getFilteredItems/getFilteredItems';

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
