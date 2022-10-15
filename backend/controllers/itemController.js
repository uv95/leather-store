const Item = require('../models/itemModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllItems = factory.getAll(Item);
exports.createItem = factory.createOne(Item);
exports.getOneItem = factory.getOne(Item);
exports.updateItem = factory.updateOne(Item);
exports.deleteItem = factory.deleteOne(Item);
