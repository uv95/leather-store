const express = require('express');

const router = express.Router();
const itemController = require('../controllers/itemController');
const authController = require('../controllers/authController');

router
  .route('/')
  .get(itemController.getAllItems)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    itemController.createItem
  );

router
  .route('/:id')
  .get(itemController.getOneItem)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    itemController.updateItem
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    itemController.deleteItem
  );

module.exports = router;
