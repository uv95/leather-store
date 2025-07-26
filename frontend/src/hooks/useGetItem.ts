import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getItemBySlug } from '../features/items/itemsSlice';
import { useParams } from 'react-router-dom';
import toast from '../shared/lib/toast/toast';

export function useGetItem() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  const { isLoading, item } = useAppSelector((state) => state.items);

  useEffect(() => {
    if (slug)
      dispatch(getItemBySlug(slug))
        .unwrap()
        .then()
        .catch((error) => toast.error(error));
  }, [dispatch, slug]);

  // const getItem = (id: string) => {
  //   dispatch(getItemById(id))
  //     .unwrap()
  //     .then()
  //     .catch((error) => console.log(error, 'ERROR'));
  // };

  return { isLoading, item };
}

export default useGetItem;
