import { memo } from 'react';
import { AdminOrder, OrderStatus } from '../../../../entities/Order';
import ListItemLayout from '../../../../shared/ui/ListItemLayout/ListItemLayout';
import OrderStatusBadge from '../../../../shared/ui/OrderStatusBadge/OrderStatusBadge';
import OrderDetails from '../OrderDetails/OrderDetails';
import './ordersAdminListItem.scss';

type OrdersAdminListItemProps = {
  order: AdminOrder;
};

const OrdersAdminListItem = ({ order }: OrdersAdminListItemProps) => {
  const { createdAt, status, user, address, total } = order;

  return (
    <ListItemLayout Details={<OrderDetails order={order} />}>
      <dl
        className="ordersAdminListItem"
        style={{
          gridTemplateColumns: `repeat(5, 1fr)`,
        }}
      >
        <div className="ordersAdminListItem__field">
          <dt className="sr-only">Created</dt>
          <dd className="ordersAdminListItem__field-content">
            {new Date(createdAt).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            })}
          </dd>
        </div>

        <div className="ordersAdminListItem__field">
          <dt className="sr-only">Client name</dt>
          <dd className="ordersAdminListItem__field-content">{user.name}</dd>
        </div>

        <div className="ordersAdminListItem__field">
          <dt className="sr-only">Client city</dt>
          <dd className="ordersAdminListItem__field-content">{address.city}</dd>
        </div>

        <div className="ordersAdminListItem__field">
          <dt className="sr-only">Total cost</dt>
          <dd className="ordersAdminListItem__field-content">{`$${total}`}</dd>
        </div>

        <div className="ordersAdminListItem__field">
          <dt className="sr-only">Status</dt>
          <dd className="ordersAdminListItem__field-content">
            <OrderStatusBadge status={status as OrderStatus} />
          </dd>
        </div>
      </dl>
    </ListItemLayout>
  );
};

export default memo(OrdersAdminListItem);
