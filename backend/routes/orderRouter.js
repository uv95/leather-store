const express = require('express');

const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);
router.use(authController.restrictTo('user'));

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createOrder);

router
  .route('/:id')
  .get(orderController.getOneOrder)
  .patch(
    authController.restrictTo('user', 'admin'),
    orderController.updateOrder
  )
  .delete(orderController.cancelOrder);

module.exports = router;
