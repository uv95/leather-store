import { AdminOrder } from '../../../../entities/Order';
import { SelectedItemColors } from '../../../../features/cart';
import ChangeStatus from '../ChangeStatus/ChangeStatus';
import './orderDetails.scss';

type OrderDetailsProps = { order: AdminOrder };

const OrderDetails = ({ order }: OrderDetailsProps) => {
  const { orderItems, address, _id: orderId, status, user } = order;

  return (
    <div className="orderDetails">
      <div className="orderDetails__items">
        {orderItems.map((orderItem) => (
          <div key={orderItem._id} className="orderDetails__items__item">
            <div className="orderDetails__items__item-left">
              <img
                src={orderItem.item.imageCover.url}
                alt={orderItem.item.name || ''}
                className="orderDetails__items__item-left-img"
              />
              <div className="orderDetails__items__item-left__info">
                <h3>{orderItem.item.name}</h3>
                <p>Leather type: {orderItem.leatherType}</p>
                <SelectedItemColors
                  leatherColor={orderItem.colors.leather}
                  threadColor={orderItem.colors.thread}
                />
                <p className="orderDetails__items__item-left__info-qty">
                  Quantity: {orderItem.quantity}
                </p>
                <p className="orderDetails__items__item-left__info-qty">
                  Price: ${orderItem.price}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="orderDetails__userInfo">
        <h3>
          Delivery address:{' '}
          <span>
            {address.city}, {address.address},{address.zipcode}
          </span>
        </h3>
        <h3>
          Client: <span>{user.name}</span>
        </h3>
        <h3>
          Contacts:{' '}
          <span>
            {user.email}, {user.phone}
          </span>
        </h3>
      </div>
      <ChangeStatus currentStatus={status} orderId={orderId} />
    </div>
  );
};

export default OrderDetails;
