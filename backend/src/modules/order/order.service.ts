import { AggregateOptions, PipelineStage, Types } from 'mongoose';
import AppError from '../../utils/appError';
import Order, { OrderStatus } from './model/order.model';
import { CartService } from '../../modules/cart/cart.service';
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

  private async getOrders(userId?: string) {
    const aggregationOptions: PipelineStage[] = [
      {
        $lookup: {
          from: 'orderitems',
          localField: '_id',
          foreignField: 'order',
          as: 'orderItems',
        },
      },
      {
        $unwind: {
          path: '$orderItems',
        },
      },
      {
        $lookup: {
          from: 'items',
          localField: 'orderItems.item',
          foreignField: '_id',
          pipeline: [{ $project: { name: 1, imageCover: 1, _id: 0 } }],
          as: 'orderItems.item',
        },
      },
      {
        $unwind: {
          path: '$orderItems.item',
        },
      },
      {
        $group: {
          _id: '$_id',
          orderItems: { $push: '$orderItems' },
          root: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ['$root', { orderItems: '$orderItems' }],
          },
        },
      },
      {
        $lookup: {
          from: 'addresses',
          localField: 'address',
          foreignField: '_id',
          pipeline: [{ $project: { city: 1, address: 1, zipcode: 1, _id: 0 } }],
          as: 'address',
        },
      },
      {
        $unwind: {
          path: '$address',
        },
      },
    ];

    if (userId) {
      aggregationOptions.unshift({
        $match: { user: new Types.ObjectId(userId) },
      });
    } else {
      aggregationOptions.push(
        {
          $lookup: {
            from: 'users',
            localField: 'user',
            foreignField: '_id',
            pipeline: [{ $project: { name: 1, phone: 1, email: 1, _id: 0 } }],
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        }
      );
    }

    aggregationOptions.push({
      $sort: { createdAt: -1 },
    });
    const orders = await Order.aggregate(aggregationOptions);

    return orders;
  }

  async getUserOrders(userId: string) {
    this.validateId(userId, 'User');
    const orders = await this.getOrders(userId);

    return orders;
  }

  async getAllOrders() {
    const orders = await this.getOrders();

    return orders;
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
    const userActiveOrderCount = await this.getUserActiveOrderCount(userId);

    return { userActiveOrderCount };
  }

  async deleteOrder(orderId: string, userId: string) {
    this.validateId(orderId, 'Order');

    await OrderItem.deleteMany({ order: orderId });
    await Order.findByIdAndDelete(orderId);

    const userActiveOrderCount = await this.getUserActiveOrderCount(userId);

    return { userActiveOrderCount };
  }

  async updateOrder(orderId: string, dto: UpdateOrderDto) {
    this.validateId(orderId, 'Order');

    const order = await Order.findById(orderId);

    if (!order) {
      throw new AppError('Order not found', 404);
    }

    return await Order.findByIdAndUpdate(orderId, dto, {
      new: true,
      runValidators: true,
    }).populate({ path: 'address', select: 'city address zipcode' });
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
