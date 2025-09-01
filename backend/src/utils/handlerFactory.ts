import { NextFunction, Request, Response } from 'express';
import { Model, Types } from 'mongoose';
import AppError from './appError';
import { catchAsync } from './catchAsync';

type PopulatePath<T> = Extract<
  {
    [K in keyof T]: T[K] extends Types.ObjectId | Types.ObjectId[] ? K : never;
  }[keyof T],
  string
>;

type PopulateSelect<T, P extends keyof T> = T[P] extends (infer U)[]
  ? keyof U & string
  : keyof T[P] & string;

interface PopulateOptions<T, P extends PopulatePath<T>> {
  path: P;
  select?: PopulateSelect<T, P> | PopulateSelect<T, P>[];
}

export const deleteOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) next(new AppError('No document found with that id!', 404));

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = <T, P extends PopulatePath<T>>(
  Model: Model<T>,
  populateOptions?: PopulateOptions<T, P>
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) next(new AppError('No document found with that id!', 404));

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const createOne = <T>(Model: Model<T>) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const newDoc = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newDoc,
    });
  });

export const getOne = <T, P extends PopulatePath<T>>(
  Model: Model<T>,
  populateOptions?: PopulateOptions<T, P>
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.findById(req.params.id);

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that id!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

export const getAll = <T, P extends PopulatePath<T>>(
  Model: Model<T>,
  populateOptions?: PopulateOptions<T, P>
) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    let query = Model.find();

    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    const doc = await query;

    if (!doc) {
      return next(new AppError('No documents found!', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });
