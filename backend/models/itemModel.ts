import { model, Schema } from 'mongoose';
import slugify from 'slugify';
import { ItemType, itemTypes } from '../utils/types';

export interface Item {
  name: string;
  slug: string;
  description: string;
  type: ItemType;
  price: number;
  imageCover: {
    url: string;
    public_id: string;
  };
  images: {
    url: string;
    public_id: string;
  }[];
  createdAt: NativeDate;
}

const itemSchema = new Schema<Item>({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
    trim: true,
  },
  slug: String,
  type: {
    type: String,
    required: [true, 'Type is required'],
    enum: {
      values: itemTypes,
      message: 'Please specify an existing item type',
    },
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
  },
  imageCover: {
    type: { url: String, public_id: String },
    required: [true, 'Item must have a cover image'],
  },
  images: [
    {
      url: String,
      public_id: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

itemSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Item = model('Item', itemSchema);

export default Item;
