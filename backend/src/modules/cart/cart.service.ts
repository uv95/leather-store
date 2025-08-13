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

      return cartItem;
    }

    return await CartItem.create({
      cart: cartId,
      ...dto,
    });
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
  }

  async getCartItems(cartId: string) {
    this.validateId(cartId, 'Cart');

    const cart = await Cart.findById(cartId);

    if (!cart) {
      throw new AppError('Cart not found', 404);
    }

    return await CartItem.find({ cart: cartId });
  }

  async clearCart(cartId: string) {
    this.validateId(cartId, 'Cart');

    await CartItem.deleteMany({ cart: cartId });
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

    return await CartItem.findByIdAndUpdate(
      cartItemId,
      {
        quantity: dto.quantity,
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }

  async mergeCartItems(userId: string, dto: MergeCartItemsDto) {
    const cart = await this.getCart(userId);
    const cartId = String(cart._id);

    for (const cartItem of dto) {
      await CartItem.findOneAndUpdate(
        {
          cart: cartId,
          item: cartItem.item,
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

    return await this.getCartItems(cartId);
  }

  async getCartItemCount(cartId: string): Promise<number> {
    this.validateId(cartId, 'Cart');

    const cartItemCount = await CartItem.aggregate([
      { $match: { cart: new Types.ObjectId(cartId) } },
      { $group: { _id: null, total: { $sum: '$quantity' } } },
    ]);

    return cartItemCount[0]?.total || 0;
  }
}
