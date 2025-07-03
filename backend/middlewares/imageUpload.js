const multer = require('multer');
const { storage } = require('../utils/cloudinary');

const upload = multer({ storage });

exports.uploadItemImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

exports.attachImageUrls = (req, res, next) => {
  if (!req.files) return next();

  if (req.files.imageCover) {
    const file = req.files.imageCover[0];
    req.body.imageCover = {
      url: file.path,
      public_id: file.filename,
    };
  }

  if (req.files.images) {
    req.body.images = req.files.images.map((file) => ({
      url: file.path,
      public_id: file.filename,
    }));
  }

  next();
};
