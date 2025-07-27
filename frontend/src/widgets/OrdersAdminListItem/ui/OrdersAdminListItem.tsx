import { memo, useMemo } from 'react';
import { OrderDetails } from '../../OrderDetails';
import { IOrder, OrderStatus } from '../../../entities/Order/model/types/order';
import ListItemLayout from '../../../shared/ui/ListItemLayout/ListItemLayout';
import OrderStatusBadge from '../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import './ordersAdminListItem.scss';

type OrdersAdminListItemProps = {
  order: IOrder;
};

const OrdersAdminListItem = ({ order }: OrdersAdminListItemProps) => {
  const { createdAt, status, user, address, total } = order;

  const orderData: Record<string, string | number> = useMemo(
    () => ({
      createdAt: new Date(createdAt).toLocaleDateString('ru-RU', {
        hour: 'numeric',
        minute: 'numeric',
      }),
      clientName: user.name,
      city: address.city,
      total: `$${total}`,
      status,
    }),
    [user.name, address.city, total, status, createdAt]
  );

  return (
    <ListItemLayout Details={<OrderDetails order={order} />}>
      <div
        className="ordersAdminListItem"
        style={{
          gridTemplateColumns: `repeat(${Object.keys(orderData).length}, 1fr)`,
        }}
      >
        {Object.keys(orderData).map((dataKey) => (
          <div key={dataKey} className={`ordersAdminListItem__field`}>
            {dataKey === 'status' ? (
              <OrderStatusBadge status={orderData.status as OrderStatus} />
            ) : (
              <div className="ordersAdminListItem__field-content">
                {orderData[dataKey]}
              </div>
            )}
          </div>
        ))}
      </div>
    </ListItemLayout>
  );
};

export default memo(OrdersAdminListItem);
