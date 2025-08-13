import multer, { FileFilterCallback } from 'multer';
import sharp from 'sharp';
import { cloudinary } from '../../utils/cloudinary';
import { NextFunction, Request, Response } from 'express';
import { UploadApiResponse } from 'cloudinary';

interface ItemImageFiles {
  imageCover?: Express.Multer.File[];
  images?: Express.Multer.File[];
}

export type RequestWithItemImages = Request & {
  files?: ItemImageFiles;
  body: {
    imageCover?: { url: string; public_id: string };
    images?: { url: string; public_id: string }[];
  };
};

const multerStorage = multer.memoryStorage();

const multerFilter: multer.Options['fileFilter'] = (
  req,
  file,
  cb: FileFilterCallback
) => {
  file.mimetype.startsWith('image')
    ? cb(null, true)
    : cb(new Error('Not an image'));
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadItemImages = upload.fields([
  { name: 'imageCover', maxCount: 1 },
  { name: 'images', maxCount: 3 },
]);

const uploadToCloudinary = (
  buffer: Buffer,
  filename: string
): Promise<UploadApiResponse> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: 'items',
        public_id: filename,
        format: 'jpeg',
        transformation: [{ width: 500, height: 500, crop: 'limit' }],
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result as UploadApiResponse);
      }
    );

    sharp(buffer)
      .resize(500, 500)
      .jpeg({ quality: 90 })
      .toFormat('jpeg')
      .pipe(stream);
  });

export const processItemImages = async (
  req: RequestWithItemImages,
  res: Response,
  next: NextFunction
) => {
  if (!req.files) return next();

  try {
    if (req.files.imageCover && req.files.imageCover[0]) {
      const { buffer } = req.files.imageCover[0];
      const filename = `item-${Date.now()}-cover`;
      const result = await uploadToCloudinary(buffer, filename);

      req.body.imageCover = {
        url: result.secure_url,
        public_id: result.public_id,
      };
    }

    if (req.files.images && req.files.images.length) {
      req.body.images = [];

      for (let i = 0; i < req.files.images.length; i++) {
        const { buffer } = req.files.images[i];
        const filename = `item-${Date.now()}-${i + 1}`;
        const result = await uploadToCloudinary(buffer, filename);

        req.body.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    next();
  } catch (err) {
    console.error('Image processing failed:', err);
    next(err);
  }
};
