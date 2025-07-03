const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');
const {
  uploadItemImages,
  processItemImages,
} = require('../middlewares/imageUpload');

router
  .route('/')
  .get(itemController.getAllItems)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    uploadItemImages,
    processItemImages,
    itemController.createItem
  );

router.route('/:slug').get(itemController.getItemBySlug);
// router.route('/:id').get(itemController.getItemById);

router
  .route('/:id')
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    uploadItemImages,
    processItemImages,
    itemController.updateItem
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    itemController.deleteItem
  );

module.exports = router;
