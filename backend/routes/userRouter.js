const express = require('express');

const router = express.Router();
const addressRouter = require('./addressRouter');
const orderRouter = require('./orderRouter');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');

router.use('/:userId/address', addressRouter);

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);

router.get(
  '/:userId/orders',
  authController.restrictTo('user'),
  orderController.getMyOrders
);
router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', userController.getMe, userController.getOneUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getOneUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
