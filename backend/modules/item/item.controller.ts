import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { RequestWithUser } from '../../utils/types';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { ItemService } from './item.service';

export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  createItem = catchAsync(
    async (
      req: Request<{}, {}, CreateItemDto>,
      res: Response,
      next: NextFunction
    ) => {
      const item = await this.itemService.createItem(req.body);

      res.status(201).json({
        status: 'success',
        data: item,
      });
    }
  );

  updateItem = catchAsync(
    async (
      req: Request<{ itemId: string }, {}, UpdateItemDto>,
      res: Response,
      next: NextFunction
    ) => {
      const updatedItem = await this.itemService.updateItem(
        req.params.itemId,
        req.body
      );

      res.status(200).json({
        status: 'success',
        data: updatedItem,
      });
    }
  );

  deleteItem = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      await this.itemService.deleteItem(req.params.itemId);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );

  getItems = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
      const items = await this.itemService.getItems();

      res.status(200).json({
        status: 'success',
        data: items,
      });
    }
  );

  getItemBySlug = catchAsync(
    async (req: RequestWithUser, res: Response, next: NextFunction) => {
      const item = await this.itemService.getItemBySlug(req.params.slug);

      res.status(200).json({
        status: 'success',
        data: item,
      });
    }
  );
}
