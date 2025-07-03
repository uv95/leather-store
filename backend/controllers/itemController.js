const Item = require('../models/itemModel');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { cloudinary } = require('../utils/cloudinary');

exports.getItemBySlug = catchAsync(async (req, res, next) => {
  const doc = await Item.findOne({ slug: req.params.slug });
  if (!doc) {
    return next(new AppError('No document found with that id!', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);

  if (!item) next(new AppError('No document found with that id!', 404));

  if (item.imageCover?.public_id) {
    await cloudinary.uploader.destroy(item.imageCover.public_id);
  }

  if (item.images?.length > 0) {
    await Promise.all(
      item.images.map((img) => cloudinary.uploader.destroy(img.public_id))
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllItems = factory.getAll(Item);
exports.createItem = factory.createOne(Item);
// exports.getItemById = factory.getOne(Item);
exports.updateItem = factory.updateOne(Item);
