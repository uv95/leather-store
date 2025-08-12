import express from 'express';
import { CartController } from './cart.controller';
import { protect } from '../../controllers/authController';
import { CartService } from './cart.service';

const cartService = new CartService();
const cartController = new CartController(cartService);

const cartRouter = express.Router();

cartRouter.use(protect);

cartRouter
  .route('/:cartId')
  .post(cartController.addToCart)
  .get(cartController.getCartItems)
  .delete(cartController.clearCart);

cartRouter.route('/:cartId/count').get(cartController.getCartItemCount);

cartRouter
  .route('/item/:cartItemId')
  .patch(cartController.changeQuantity)
  .delete(cartController.removeFromCart);

cartRouter.route('/').get(cartController.getCart);

export { cartRouter };
