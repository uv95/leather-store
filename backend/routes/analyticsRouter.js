const express = require('express');

const analyticsController = require('../controllers/analyticsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.get(
  '/monthly-revenue',
  authController.protect,
  authController.restrictTo('admin'),
  analyticsController.getMonthlyRevenue
);

module.exports = router;
