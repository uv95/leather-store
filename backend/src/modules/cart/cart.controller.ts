import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { CartService } from './cart.service';
import {
  ChangeQuantityDto,
  CreateCartItemDto,
  MergeCartItemsDto,
} from './dto/cart.dto';

export class CartController {
  constructor(private readonly cartService: CartService) {}

  addToCart = catchAsync(
    async (
      req: Request<{ cartId: string }, {}, CreateCartItemDto>,
      res: Response,
      next: NextFunction
    ) => {
      const data = await this.cartService.addToCart(
        req.params.cartId,
        req.body
      );

      res.status(201).json({
        status: 'success',
        data,
      });
    }
  );

  removeFromCart = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.cartService.removeFromCart(req.params.cartItemId);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  getCart = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const data = await this.cartService.getCart(req.user?.id);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  getCartItems = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.cartService.getCartItems(req.params.cartId);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  clearCart = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await this.cartService.clearCart(req.params.cartId);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );

  changeQuantity = catchAsync(
    async (
      req: Request<{ cartItemId: string }, {}, ChangeQuantityDto>,
      res: Response,
      next: NextFunction
    ) => {
      const data = await this.cartService.changeQuantity(
        req.params.cartItemId,
        req.body
      );

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  mergeCartItems = catchAsync(
    async (
      req: RequestWithUser<{}, {}, MergeCartItemsDto>,
      res: Response,
      next: NextFunction
    ) => {
      const data = await this.cartService.mergeCartItems(
        req.user?.id,
        req.body
      );

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );

  getCartItemCount = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const data = await this.cartService.getCartItemCount(req.params.cartId);

      res.status(200).json({
        status: 'success',
        data,
      });
    }
  );
}
