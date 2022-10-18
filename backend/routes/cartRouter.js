const express = require('express');

const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(cartController.getCart)
  .post(cartController.setUserId, cartController.createCart)
  .delete(cartController.emptyCart);

router.route('/:id').delete(cartController.deleteItem);
router.route('/:id/decreaseQuantity').delete(cartController.decreaseQuantity);

module.exports = router;
