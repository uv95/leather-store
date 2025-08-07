import { Order, OrderStatus, OrderSchema } from './model/types/order';
import orderReducer from './model/slice/orderSlice';
import { getAllActiveOrders } from './model/selectors/getAllActiveOrders/getAllActiveOrders';
import { getAllOrders as getAllOrdersSelector } from './model/selectors/getAllOrders/getAllOrders';
import { getUserActiveOrders } from './model/selectors/getUserActiveOrders/getUserActiveOrders';
import { getAllCompletedOrders } from './model/selectors/getAllCompletedOrders/getAllCompletedOrders';
import { getUserCompletedOrders } from './model/selectors/getUserCompletedOrders/getAllCompletedOrders';
import { getOrderLoading } from './model/selectors/getOrderLoading/getOrderLoading';
import { cancelOrder } from './model/services/cancelOrder/cancelOrder';
import { createOrder } from './model/services/createOrder/createOrder';
import { getAllOrders } from './model/services/getAllOrders/getAllOrders';
import { getOrder } from './model/services/getOrder/getOrder';
import { updateOrder } from './model/services/updateOrder/updateOrder';
import { getUserOrders } from './model/services/getUserOrders/getUserOrders';

export {
  type Order,
  OrderStatus,
  type OrderSchema,
  orderReducer,
  getAllActiveOrders,
  getUserActiveOrders,
  getAllOrdersSelector,
  getAllCompletedOrders,
  getUserCompletedOrders,
  getOrderLoading,
  cancelOrder,
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
  updateOrder,
};
