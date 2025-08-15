import { Types } from 'mongoose';
import AppError from '../../utils/appError';
import Item from './model/item.model';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';

export class ItemService {
  private validateId(id: string) {
    if (!Types.ObjectId.isValid(id)) {
      throw new AppError('Item id is invalid', 400);
    }
  }

  async createItem(dto: CreateItemDto) {
    return await Item.create(dto);
  }

  async updateItem(itemId: string, dto: UpdateItemDto) {
    this.validateId(itemId);

    const item = await Item.findById(itemId);

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    return await Item.findByIdAndUpdate(itemId, dto, {
      runValidators: true,
      new: true,
    });
  }

  async deleteItem(itemId: string) {
    this.validateId(itemId);

    await Item.findByIdAndDelete(itemId);
  }

  async getItems() {
    return await Item.find();
  }

  async getItemBySlug(slug: string) {
    const item = await Item.findOne({ slug });

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    return item;
  }

  async getItemById(itemId: string) {
    this.validateId(itemId);
    const item = await Item.findById(itemId);

    if (!item) {
      throw new AppError('Item not found', 404);
    }

    return item;
  }
}
