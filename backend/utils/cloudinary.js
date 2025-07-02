const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: 'items',
    format: 'jpeg',
    public_id: `${Date.now()}-${file.originalname}`,
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  }),
});

module.exports = { cloudinary, storage };
