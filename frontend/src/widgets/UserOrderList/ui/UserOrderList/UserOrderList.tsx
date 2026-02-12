import { memo, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
  getOrderLoading,
  getUserActiveOrders,
  getUserCompletedOrders,
  getUserOrders,
} from '../../../../entities/Order';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch';
import toast from '../../../../shared/lib/toast/toast';
import UserOrderListItem from '../UserOrderListItem/UserOrderListItem';
import UserOrderListSkeleton from '../UserOrderListSkeleton/UserOrderListSkeleton';
import styles from './UserOrderList.module.scss';

const UserOrderList = () => {
  const dispatch = useAppDispatch();
  const loading = useSelector(getOrderLoading);
  const userActiveOrders = useSelector(getUserActiveOrders);
  const userCompletedOrders = useSelector(getUserCompletedOrders);

  const userOrders = useMemo(
    () => [...userActiveOrders, ...userCompletedOrders],
    [userActiveOrders, userCompletedOrders],
  );

  useEffect(() => {
    if (!userOrders.length) {
      dispatch(getUserOrders())
        .unwrap()
        .then()
        .catch((error: string) => toast.error(error));
    }
  }, [dispatch, userOrders.length]);

  return (
    <>
      <h1 className={styles.heading}>My Orders</h1>

      {loading === 'pending' && <UserOrderListSkeleton />}

      {loading === 'succeeded' && (
        <div className={styles.container}>
          {!userOrders.length && (
            <p className={styles.emptyList} role="status">
              Order list is empty.
            </p>
          )}

          {userActiveOrders.length !== 0 && (
            <>
              <h2 className={styles.sectionTitle}>Active</h2>
              <ul className={styles.orderList}>
                {userActiveOrders.map((order) => (
                  <li key={order._id}>
                    <UserOrderListItem order={order} />
                  </li>
                ))}
              </ul>
            </>
          )}

          {userCompletedOrders.length !== 0 && (
            <>
              <h2 className={styles.sectionTitle}>Completed</h2>
              <ul className={styles.orderList}>
                {userCompletedOrders.map((order) => (
                  <li key={order._id}>
                    <UserOrderListItem order={order} />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default memo(UserOrderList);
