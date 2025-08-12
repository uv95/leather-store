import { Types } from 'mongoose';
import AppError from '../../utils/appError';
import Order, { OrderStatus } from './model/order.model';
import { CartService } from 'modules/cart/cart.service';
import CartItem from '../../modules/cart/model/cartItem.model';
import OrderItem from './model/orderItem.model';
import { CreateOrderDto, UpdateOrderDto } from './dto/order.dto';

export class OrderService {
  constructor(private cartService: CartService) {}

  private validateId(
    id: string,
    entity: 'Order' | 'Order item' | 'User' | 'Cart'
  ) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(`${entity} id is invalid`, 400);
    }
  }

  async getUserOrders(userId: string) {
    this.validateId(userId, 'User');

    const orders = await Order.aggregate([
      {
        $match: { user: new Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: 'orderitems',
          localField: '_id',
          foreignField: 'order',
          as: 'orderItems',
        },
      },
      {
        $sort: { createdAt: -1 },
      },
    ]);

    return orders;
  }

  async getAllOrders() {
    return await Order.find();
  }

  async createOrder(userId: string, dto: CreateOrderDto) {
    this.validateId(userId, 'User');
    this.validateId(dto.cartId, 'Cart');

    const cartItems = await CartItem.find({ cart: dto.cartId });

    if (!cartItems.length) {
      throw new AppError('Cart is empty!', 404);
    }

    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder = await Order.create({
      user: userId,
      address: dto.address,
      total,
    });

    const bulkOperations = cartItems.map((cartItem) => ({
      insertOne: {
        document: {
          leatherType: cartItem.leatherType,
          quantity: cartItem.quantity,
          price: cartItem.price,
          order: newOrder._id,
          item: cartItem.item,
          colors: cartItem.colors,
        },
      },
    }));

    await OrderItem.bulkWrite(bulkOperations);
    await this.cartService.clearCart(dto.cartId);

    const orderItems = await OrderItem.find({ order: newOrder._id }).lean();

    return {
      order: {
        ...newOrder.toObject(),
        orderItems,
      },
    };
  }

  async deleteOrder(orderId: string) {
    this.validateId(orderId, 'Order');

    await OrderItem.deleteMany({ order: orderId });
    await Order.findByIdAndDelete(orderId);
  }

  async updateOrder(orderId: string, dto: UpdateOrderDto) {
    this.validateId(orderId, 'Order');

    return await Order.findByIdAndUpdate(orderId, dto, {
      new: true,
      runValidators: true,
    });
  }

  async getUserActiveOrderCount(userId: string): Promise<number> {
    this.validateId(userId, 'User');

    const orderCount = await Order.countDocuments({
      user: userId,
      status: { $in: [OrderStatus.AWAITING_PAYMENT, OrderStatus.IN_PROGRESS] },
    });

    return orderCount;
  }
}
