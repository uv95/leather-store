import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getItem } from '../features/items/itemsSlice';
import { useParams } from 'react-router-dom';

export function useGetItem() {
  const dispatch = useAppDispatch();
  const { slug } = useParams();

  const { isLoading, item } = useAppSelector((state) => state.items);

  useEffect(() => {
    if (slug)
      dispatch(getItem(slug))
        .unwrap()
        .then()
        .catch((error) => console.log(error, 'ERROR'));
  }, [dispatch, slug]);

  return { isLoading, item };
}

export default useGetItem;
