import { Types } from 'mongoose';
import AppError from '../../utils/appError';
import {
  ChangeQuantityDto,
  CreateCartItemDto,
  MergeCartItemsDto,
} from './dto/cart.dto';
import Cart from './model/cart.model';
import CartItem from './model/cartItem.model';

export class CartService {
  private validateId(id: string, entity: 'Cart' | 'Cart item' | 'User') {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError(`${entity} id is invalid`, 400);
    }
  }

  private async getUpdatedCartTotal(cartId: string) {
    const totalCost = await CartItem.aggregate([
      { $match: { cart: new Types.ObjectId(cartId) } },
      {
        $group: {
          _id: null,
          total: { $sum: { $multiply: ['$price', '$quantity'] } },
        },
      },
    ]);

    const total = totalCost[0]?.total || 0;
    await Cart.findByIdAndUpdate(cartId, { total });

    return total;
  }

  async addToCart(cartId: string, dto: CreateCartItemDto) {
    this.validateId(cartId, 'Cart');

    const filters = {
      cart: cartId,
      leatherType: dto.leatherType,
      price: dto.price,
      item: dto.item,
      'colors.leather': dto.colors.leather,
      'colors.thread': dto.colors.thread,
    };

    const cartItem = await CartItem.findOne(filters);

    if (cartItem) {
      cartItem.quantity += dto.quantity;
      await cartItem.save();
      const total = await this.getUpdatedCartTotal(cartId);

      return { cartItem, total };
    }

    await CartItem.create({
      cart: cartId,
      ...dto,
    });
    const total = await this.getUpdatedCartTotal(cartId);
    const itemCount = await this.getCartItemCount(cartId);

    return { total, itemCount };
  }

  async getCart(userId: string) {
    this.validateId(userId, 'User');

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return await Cart.create({
        user: userId,
      });
    }

    return cart;
  }

  async removeFromCart(cartItemId: string) {
    this.validateId(cartItemId, 'Cart item');

    const cartItem = await CartItem.findById(cartItemId);

    if (!cartItem) {
      throw new AppError('Cart item not found', 404);
    }

    await CartItem.findByIdAndDelete(cartItemId);

    const cartId = String(cartItem.cart._id);
    const updatedData = await this.getUpdatedData(cartId);

    return updatedData;
  }

  async getCartItems(cartId: string) {
    this.validateId(cartId, 'Cart');

    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    return await CartItem.find({ cart: cartId }).populate({
      path: 'item',
      select: 'imageCover name',
    });
  }

  async clearCart(cartId: string) {
    this.validateId(cartId, 'Cart');

    await CartItem.deleteMany({ cart: cartId });
    await Cart.findByIdAndUpdate(cartId, { total: 0 });
  }

  async changeQuantity(cartItemId: string, dto: ChangeQuantityDto) {
    this.validateId(cartItemId, 'Cart item');

    const cartItem = await CartItem.findById(cartItemId);

    if (!cartItem) {
      throw new AppError('Cart item not found', 404);
    }

    if (dto.quantity <= 0) {
      return await CartItem.findByIdAndDelete(cartItemId);
    }

    await CartItem.findByIdAndUpdate(
      cartItemId,
      {
        quantity: dto.quantity,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    const cartId = String(cartItem.cart._id);
    const updatedData = await this.getUpdatedData(cartId);

    return updatedData;
  }

  async mergeCartItems(userId: string, dto: MergeCartItemsDto) {
    const cart = await this.getCart(userId);
    const cartId = String(cart._id);

    for (const cartItem of dto) {
      await CartItem.findOneAndUpdate(
        {
          cart: cartId,
          item: cartItem.item,
          leatherType: cartItem.leatherType,
          colors: {
            leather: cartItem.colors.leather,
            thread: cartItem.colors.thread,
          },
          price: cartItem.price,
        },
        {
          $inc: { quantity: cartItem.quantity },
        },
        {
          upsert: true,
          new: true,
        }
      );
    }

    const updatedData = await this.getUpdatedData(cartId);

    return updatedData;
  }

  private async getUpdatedData(cartId: string) {
    const total = await this.getUpdatedCartTotal(cartId);
    const cartItems = await this.getCartItems(cartId);
    const itemCount = await this.getCartItemCount(cartId);

    return { cartItems, total, itemCount };
  }

  async getCartItemCount(cartId: string): Promise<number> {
    const cartItemCount = await CartItem.aggregate([
      { $match: { cart: new Types.ObjectId(cartId) } },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    return cartItemCount[0]?.total || 0;
  }
}
