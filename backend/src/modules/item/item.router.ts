import express from 'express';
import { uploadItemImages, processItemImages } from './item.middleware';
import { protect, restrictTo } from '../../modules/auth/auth.middleware';
import { ItemService } from './item.service';
import { ItemController } from './item.controller';

const itemService = new ItemService();
const itemController = new ItemController(itemService);

const itemRouter = express.Router();

itemRouter
  .route('/')
  .get(itemController.getItems)
  .post(
    protect,
    restrictTo('admin'),
    uploadItemImages,
    processItemImages,
    itemController.createItem
  );

itemRouter.route('/slug/:slug').get(itemController.getItemBySlug);

itemRouter
  .route('/:itemId')
  .patch(
    protect,
    restrictTo('admin'),
    uploadItemImages,
    processItemImages,
    itemController.updateItem
  )
  .delete(protect, restrictTo('admin'), itemController.deleteItem)
  .get(itemController.getItemById);

export { itemRouter };
