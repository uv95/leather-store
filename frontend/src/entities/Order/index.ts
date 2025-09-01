import {
  Order,
  OrderStatus,
  OrderSchema,
  UserOrder,
  AdminOrder,
} from './model/types/order';
import orderReducer from './model/slice/orderSlice';
import { getAllActiveOrders } from './model/selectors/getAllActiveOrders/getAllActiveOrders';
import { getAllOrders as getAllOrdersSelector } from './model/selectors/getAllOrders/getAllOrders';
import { getUserActiveOrders } from './model/selectors/getUserActiveOrders/getUserActiveOrders';
import { getAllCompletedOrders } from './model/selectors/getAllCompletedOrders/getAllCompletedOrders';
import { getUserCompletedOrders } from './model/selectors/getUserCompletedOrders/getAllCompletedOrders';
import { getUserActiveOrderCount as getUserActiveOrderCountSelector } from './model/selectors/getUserActiveOrderCount/getUserActiveOrderCount';
import { getOrderLoading } from './model/selectors/getOrderLoading/getOrderLoading';
import { deleteOrder } from './model/services/deleteOrder/deleteOrder';
import { createOrder } from './model/services/createOrder/createOrder';
import { getAllOrders } from './model/services/getAllOrders/getAllOrders';
import { updateOrder } from './model/services/updateOrder/updateOrder';
import { getUserOrders } from './model/services/getUserOrders/getUserOrders';
import { getUserActiveOrderCount } from './model/services/getUserActiveOrderCount/getUserActiveOrderCount';

export {
  type UserOrder,
  type AdminOrder,
  type Order,
  OrderStatus,
  type OrderSchema,
  orderReducer,
  getAllActiveOrders,
  getUserActiveOrders,
  getUserActiveOrderCountSelector,
  getAllOrdersSelector,
  getAllCompletedOrders,
  getUserCompletedOrders,
  getOrderLoading,
  deleteOrder,
  createOrder,
  getAllOrders,
  getUserOrders,
  updateOrder,
  getUserActiveOrderCount,
};
