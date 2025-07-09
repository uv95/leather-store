const Cart = require('../models/cartModel');
const Item = require('../models/itemModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.setUserId = (req, res, next) => {
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'items.item',
    select: 'name price imageCover type',
  });

  res.status(200).json({
    status: 'success',
    data: cart,
  });
});

exports.createCart = catchAsync(async (req, res, next) => {
  const { item: cartItem, quantity, colors, leather, total } = req.body;

  const cart = await Cart.findOne({ user: req.user.id });
  const item = await Item.findOne({ name: cartItem.name });

  if (!item) {
    return next(new AppError('No item found with that name!', 404));
  }

  if (cart) {
    //check if there is item in cart with the same ID and COLORS
    const itemIndex = cart.items.findIndex(
      (item) =>
        item.name === cartItem.name &&
        Object.values(item.colors).every(
          (color, i) => color === Object.values(colors)[i]
        ) &&
        item.leather === leather
    );

    if (itemIndex > -1) {
      let product = cart.items[itemIndex];
      product.quantity += 1;
      cart.items[itemIndex] = product;

      await cart.save();
      const populatedCart = await getPopulatedCart(cart);

      res.status(200).json({
        status: 'success',
        data: populatedCart,
      });
    } else {
      cart.items.push({
        item,
        quantity,
        colors,
        leather,
        total,
      });

      await cart.save();
      const populatedCart = await getPopulatedCart(cart);

      res.status(200).json({
        status: 'success',
        data: populatedCart,
      });
    }
  }

  if (!cart) {
    const newCart = await Cart.create({
      user: req.user.id,
      items: [{ item, quantity, colors, leather, total }],
      total: quantity * item.price,
      quantity,
    });

    res.status(201).json({
      status: 'success',
      data: newCart,
    });
  }
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id });
  const cartItems = req.body.items.map((cartItem) => ({
    ...cartItem,
    item: cartItem._id,
  }));
  const body = {
    ...req.body,
    items: cartItems,
  };

  if (!cart) {
    const newCart = await Cart.create(body);
    const populatedCart = await getPopulatedCart(newCart);

    res.status(201).json({
      status: 'success',
      data: populatedCart,
    });
  }

  if (cart) {
    const updatedCart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCart) next(new AppError('No cart found!', 404));
    const populatedCart = await getPopulatedCart(updatedCart);

    res.status(200).json({
      status: 'success',
      data: populatedCart,
    });
  }
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const { cartItemId } = req.params;

  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'items.item',
    select: 'name price imageCover type',
  });

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toHexString() === cartItemId
  );

  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    item.total -= item.item.price;

    if (item.total < 0) {
      item.total = 0;
    }

    cart.items.splice(itemIndex, 1);
    cart = await cart.save();

    const populatedCart = await getPopulatedCart(cart);

    res.status(200).json({
      status: 'success',
      data: populatedCart,
    });
  } else {
    return next(new AppError('No item found!', 404));
  }
});

exports.changeQuantity = catchAsync(async (req, res, next) => {
  const { cartItemId } = req.params;
  const quantity = req.body.quantity;

  let cart = await Cart.findOne({ user: req.user.id }).populate({
    path: 'items.item',
    select: 'price',
  });

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toHexString() === cartItemId
  );

  if (itemIndex > -1) {
    let item = cart.items[itemIndex];
    item.quantity = quantity;
    item.total = item.item.price * quantity;

    if (item.total < 0) {
      item.total = 0;
    }
    if (item.quantity === 0) {
      cart.items.splice(itemIndex, 1);
    }

    cart = await cart.save();

    const populatedCart = await getPopulatedCart(cart);

    res.status(200).json({
      status: 'success',
      data: populatedCart,
    });
  } else {
    return next(new AppError('No item found!', 404));
  }
});

exports.emptyCart = catchAsync(async (req, res, next) => {
  await Cart.findOneAndDelete({ user: req.user.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

async function getPopulatedCart(cart) {
  return await cart.populate({
    path: 'items.item',
    select: 'name price imageCover type',
  });
}
